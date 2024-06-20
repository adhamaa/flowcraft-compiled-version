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
  generateNodeId: () => string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onLayout: (direction: string | undefined) => void;
  onSave: () => void;
  onApply: () => void;
  onReset: () => void;
  onAdd: () => void;
  onMove: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onDisjoint: () => void;
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
      generateNodeId: () => crypto.randomUUID(),
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
        console.log('save')
      },
      onApply: () => {
        const instance = get().rfInstance;
        const key = get().flowKey as string;

        if (instance) {
          const flow = instance.toObject();
          localStorage.setItem(key, JSON.stringify(flow));
        }
      },
      onReset: () => {
        const instance = get().rfInstance;
        const key = get().flowKey as string;

        const restoreFlow = async () => {
          const flow = JSON.parse(localStorage.getItem(key) as string);

          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            set({ nodes: flow.nodes || [], edges: flow.edges || [] });
            instance?.setViewport({ x, y, zoom });
          }
        };

        restoreFlow();
      },
      onAdd: () => {
        const uuid = get().generateNodeId();
        console.log('uuid:', uuid)
        const node = {
          id: uuid,
          type: 'default',
          data: { label: 'New Node' },
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight - 100,
          },
        };

        set({ nodes: [...get().nodes, node] });
      },
      onMove: () => { console.log('move') },
      onDuplicate: () => {
        const { nodes, edges } = get();
        const selectedNodes = nodes.filter((node) => node.selected);

        selectedNodes.forEach((node) => {
          const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
          };

          const newNode = {
            ...node,
            selected: false,
            dragging: false,
            id: `${node.id}-Copy`,
            position,
          };

          set({ nodes: [...nodes, newNode] });
        });
      },
      onDelete: () => {
        const { nodes, edges } = get();
        const selectedNodes = nodes.filter((node) => node.selected);

        selectedNodes.forEach((node) => {
          set({
            nodes: nodes.filter((n) => n.id !== node.id),
            edges: edges.filter((e) => e.source !== node.id && e.target !== node.id),
          });
        });
      },
      onRestore: () => { console.log('restore') },
      onDisjoint: () => { console.log('disjoint') },
      setNodes: (nodes: Node[]) => {
        set({ nodes });
      },
      setEdges: (edges: Edge[]) => {
        set({ edges });
      },
      setRfInstance: (rfInstance: any) => {
        set({ rfInstance });
      },
      toggleSelectedByNodeId: (nodeId: string) => {
        set((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === nodeId) {
              node.selected = !node.selected;
            } else {
              node.selected = false;
            }

            return node;
          }),
        }));
      },
      addEdgesByNodeId: (nodeId: string) => {
        const { nodes, edges } = get();
        const selectedNode = nodes.find((node) => node.id === nodeId);

        if (!selectedNode) {
          return;
        }

        const newEdges = nodes
          .filter((node) => node.id !== selectedNode.id && node.selected)
          .map((node) => ({
            id: `edge-${selectedNode.id}-${node.id}`,
            source: selectedNode.id,
            target: node.id,
            animated: true,
          }));

        set({ edges: [...edges, ...newEdges] });
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
    onSave: state.onSave,
    onApply: state.onApply,
    onReset: state.onReset,
    onAdd: state.onAdd,
    onMove: state.onMove,
    onDuplicate: state.onDuplicate,
    onDelete: state.onDelete,
    onRestore: state.onRestore,
    onDisjoint: state.onDisjoint,
    setRfInstance: state.setRfInstance,
    fetchNodesEdges: state.fetchNodesEdges,
  })),
);

export default useWorkInProgressDiagram;

