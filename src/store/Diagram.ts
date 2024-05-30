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
        // check if storage has the data
        const storedData = storage.getItem('diagram-storage');
        // if (storedData) {
        //   return;
        // } else {
        //   return;
        // if not, fetch from the server
        const diagramData = await getDiagramData({ cycle_id, apps_label });
        // and then set the data to the store
        set({
          nodes: diagramData.nodes.map((node: Node) => {
            return {
              ...node,
              position: {
                x: parseFloat(node.position.x as never),
                y: parseFloat(node.position.y as never)
              },

            }
          }),
          edges: diagramData.edges.map((edge: Edge) => {
            return {
              ...edge,
              type: 'bezier', // step, smoothstep, straight or bezier
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

