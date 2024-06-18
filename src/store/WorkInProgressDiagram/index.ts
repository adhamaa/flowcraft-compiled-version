import { create } from 'zustand';
import superjson from 'superjson' //  can use anything: serialize-javascript, devalue, etc.
import { PersistStorage, persist } from 'zustand/middleware'
import dagre from '@dagrejs/dagre';

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
  ReactFlowInstance,
} from 'reactflow';

import initialNodes from '@/components/reactflow/nodes';
import initialEdges from '@/components/reactflow/edges';
import { Apps_label, getDiagramData } from '@/lib/service/client';
import { calculateNodePositions } from '@/components/reactflow/CalculateNodePositions';
import { useShallow } from 'zustand/react/shallow';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250; // horizontal space between nodes
const nodeHeight = 200; // vertical space between nodes

type RFState = {
  flowKey: string | undefined;
  nodes: Node[];
  edges: Edge[];
  rfInstance: ReactFlowInstance | null;
  getNodeId: () => string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onLayout: (direction: string | undefined) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setRfInstance: (rfInstance: ReactFlowInstance) => void;
  fetchNodesEdges: (props: { cycle_id: string; apps_label: Apps_label }) => Promise<void>;
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

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    //@ts-ignore
    node.targetPosition = isHorizontal ? 'left' : 'top';
    //@ts-ignore
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};



const useDiagramStore = create<RFState>()(
  persist(
    (set, get) => ({
      flowKey: 'wip-flow',
      nodes: initialNodes,
      edges: initialEdges,
      rfInstance: null,
      getNodeId: () => `randomnode_${+new Date()}`,
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
      onLayout: (direction: string | undefined) => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          get().nodes,
          get().edges,
          direction
        );

        set({ nodes: layoutedNodes, edges: layoutedEdges })
      },
      onSave: () => {
        if (get().rfInstance) {
          const flow = get().rfInstance!.toObject();
          localStorage.setItem('flow', JSON.stringify(flow));
        }
      },
      onRestore: () => {
        const restoreFlow = async () => {
          const flow = JSON.parse(localStorage.getItem(get().flowKey as string) as string);

          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            set({ nodes: flow.nodes || [], edges: flow.edges || [] });
            get().rfInstance?.setViewport({ x, y, zoom });
          }
        };

        restoreFlow();
      },
      onAdd: () => {
        const node = {
          id: get().getNodeId(),
          type: 'default',
          data: { label: 'New Node' },
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight - 100,
          },
        };

        set({ nodes: [...get().nodes, node] });
      },
      setNodes: (nodes: Node[]) => {
        set({ nodes });
      },
      setEdges: (edges: Edge[]) => {
        set({ edges });
      },
      setRfInstance: (rfInstance: any) => {
        set({ rfInstance });
      },
      fetchNodesEdges: async ({
        cycle_id,
        apps_label,
      }) => {
        const diagramData = await getDiagramData({ cycle_id, apps_label });
        const editedNodes = diagramData.nodes.map(({ position, ...node }: Node) => {
          return { ...node, position: { x: 0, y: 0 } } // remove position and set x, y to 0
        });
        const editedEdges = diagramData.edges.map(({ type, markerEnd, ...edge }: Edge) => {
          return { ...edge } // remove type and markerEnd
        });

        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          editedNodes,
          editedEdges
        );

        set({
          nodes: layoutedNodes,
          edges: layoutedEdges,
        });
      },
    }),
    {
      name: 'wip-diagram-storage',
      storage,
    },
  ),
);

const useWorkInProgressDiagram = () => useDiagramStore(
  useShallow((state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onLayout: state.onLayout,
    fetchNodesEdges: state.fetchNodesEdges,
  })),
);

export default useWorkInProgressDiagram;

