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
import { calculateNodePositions8 } from '@/components/reactflow/CalculateNodePositions';

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


// this is our useStore hook that we can use in our components to get parts of the store and call actions
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
        const storedData = storage.getItem('diagram-storage');

        const diagramData = await getDiagramData({ cycle_id, apps_label });

        set({
          nodes: diagramData.nodes.map(({ position, ...node }: Node) => {
            const removedPosition = { ...node, position: undefined }
            const updatedNodes = calculateNodePositions8([removedPosition], get().edges)
            return {
              ...node,
              position: {
                // x: parseFloat(position.x as never),
                // y: parseFloat(position.y as never)
                x: 0,
                y: 0
              },
            }
          }),
          edges: diagramData.edges.map(({ type, markerEnd, ...edge }: Edge) => {
            return {
              ...edge,
            }
          }),

        });
        // }
      },
      updateNodeColor: (nodeId: string, color: string) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              // it's important to create a new object here, to inform React Flow about the changes
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

