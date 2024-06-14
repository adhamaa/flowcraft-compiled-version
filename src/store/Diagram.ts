import { create } from 'zustand';
import superjson from 'superjson' //  can use anything: serialize-javascript, devalue, etc.
import { PersistStorage, persist } from 'zustand/middleware'

import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from '@/components/reactflow/nodes';
import initialEdges from '@/components/reactflow/edges';
import { Apps_label, getDiagramData } from '@/lib/service/client';
import { calculateNodePositions } from '@/components/reactflow/CalculateNodePositions';

export type NodeData = {
  color: string;
};

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  fetchNodesEdges: (props: { cycle_id: string; apps_label: Apps_label }) => Promise<void>;
  updateNodeColor: (nodeId: string, color: string) => void;
  getNodesWithPositions: (nodes: Node[], edges: Edge[]) => Node[];
};

const storage: PersistStorage<RFState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name)
    if (!str) return null
    return superjson.parse(str)
  },
  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value))
  },
  removeItem: (name) => localStorage.removeItem(name),
}


const useDiagramStore = create<RFState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setNodes: (nodes: Node[]) => {
        set({ nodes });
      },
      setEdges: (edges: Edge[]) => {
        set({ edges });
      },
      fetchNodesEdges: async ({
        cycle_id,
        apps_label,
      }) => {
        const diagramData = await getDiagramData({ cycle_id, apps_label });
        set({
          nodes: diagramData.nodes.map(({ position, ...node }: Node) => {
            // const removedPosition = { ...node, position: { x: 0, y: 0 } };
            // return removedPosition
            return {
              ...node,
              position: {
                x: parseFloat(position.x as never),
                y: parseFloat(position.y as never)
                // x: 0,
                // y: 0
              },
            }

          }),
          edges: diagramData.edges.map(({ type, markerEnd, ...edge }: Edge) => {
            return {
              ...edge,
            }
          }),
        });
      },
      getNodesWithPositions: (nodes, edges) => {
        const updatedNodes = calculateNodePositions(nodes, edges);
        console.log('updatedNodes:', updatedNodes)
        return updatedNodes;
      },
      updateNodeColor: (nodeId: string, color: string) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, color };
            }

            return node;
          }),
        });
      },
    }),
    {
      name: 'diagram-storage',
      storage,
    },
  ),
);

export default useDiagramStore;

