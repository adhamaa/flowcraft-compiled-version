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
  ConnectionLineType,
} from 'reactflow';

import initialNodes from '@/components/reactflow/nodes';
import initialEdges from '@/components/reactflow/edges';
import { Apps_label, getDiagramData } from '@/lib/service/client';
import { calculateNodePositions } from '@/components/reactflow/CalculateNodePositions';
import { useShallow } from 'zustand/react/shallow';
import { ComboboxItem } from '@mantine/core';
import { convertToCycleStages } from '@/lib/helper';
import { boolean } from 'drizzle-orm/pg-core';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250; // horizontal space between nodes
const nodeHeight = 200; // vertical space between nodes

type RFState = {
  flowKey: string | undefined;
  nodes: Node[];
  edges: Edge[];
  rfInstance: ReactFlowInstance | null;
  getSelectedNodeId: () => string | undefined;
  getInputOptions: () => ComboboxItem[];
  generateNodeId: () => string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onLayout: (direction: string | undefined) => void;
  onSave: () => void;
  onDraft: () => void;
  onApply: (data: any, callback?: (
    ...args: any[]
  ) => void) => void;
  onReset: () => void;
  onAdd: (stage_name: string) => void;
  onMove: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onDisjoint: (nodeId: string) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setRfInstance: (rfInstance: ReactFlowInstance) => void;
  fetchNodesEdges: (props: { cycle_id: string; apps_label: Apps_label }) => Promise<void>;
  toggleSelectedByNodeId: (nodeId: string) => void;
  setUpdateEdges: (data: {
    previous_stage: string[]; next_stage: string[]; curr_stage_uuid: string;
  }) => void;
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
      getSelectedNodeId: () => get().nodes.find((node) => node.selected)?.id,
      getInputOptions: () => get().nodes.map((node) => ({
        value: node.id,
        label: node.data.label,
      })),
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
        console.log('connection:', connection)
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
        const ApiFormat = convertToCycleStages(get().nodes, get().edges);
        console.log('ApiFormat:', ApiFormat)
      },
      onDraft: () => {
        const instance = get().rfInstance;
        const key = get().flowKey as string;

        if (instance) {
          const flow = instance.toObject();
          localStorage.setItem(key, JSON.stringify(flow));
        }
      },
      onApply: (data, callback) => {
        console.log('data:', data)
        console.log('callback:', callback)
        console.log('apply')
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
      onAdd: (stage_name = 'New Node') => {
        const uuid = get().generateNodeId();
        console.log('uuid:', uuid)
        const node = {
          id: uuid,
          type: '', // 'Start' | 'WithEntryAndExit' | 'WithEntry'| 'WithExit' | 'End'  
          data: { label: stage_name },
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight - 100,
          },
        };

        set({ nodes: [...get().nodes, node] });
      },
      onMove: () => { console.log('move') },
      onDuplicate: () => {
        const uuid = get().generateNodeId();
        const { nodes, edges } = get();
        const selectedNodes = nodes.filter((node) => node.selected);

        selectedNodes.forEach((node) => {
          const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
          };

          const newNode = {
            ...node,
            data: { ...node.data, label: `${node.data.label}-Copy` },
            selected: false,
            dragging: false,
            id: uuid,
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
      onDisjoint: () => {
        const { nodes, edges } = get();
        const selectedNode = nodes.find((node) => node.selected);
        console.log('selectedNode:', selectedNode)

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
      setUpdateEdges: (data) => {
        const { previous_stage, next_stage, curr_stage_uuid } = data;

        const createEdge = (source: string, target: string) => ({
          id: `${source}-${target}`,
          source,
          target,
          type: ConnectionLineType.SmoothStep,
          animated: false,
        });

        const prev2curr = previous_stage?.map((prev: string) => createEdge(prev, curr_stage_uuid)) || [];
        const curr2next = next_stage?.map((next: string) => createEdge(curr_stage_uuid, next)) || [];

        const combinedEdges = [...prev2curr, ...curr2next];

        set({ edges: [...get().edges, ...combinedEdges] });
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
    getSelectedNodeId: state.getSelectedNodeId,
    getInputOptions: state.getInputOptions,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onLayout: state.onLayout,
    onSave: state.onSave,
    onDraft: state.onDraft,
    onApply: state.onApply,
    onReset: state.onReset,
    onAdd: state.onAdd,
    onMove: state.onMove,
    onDuplicate: state.onDuplicate,
    onDelete: state.onDelete,
    onRestore: state.onRestore,
    onDisjoint: state.onDisjoint,
    fetchNodesEdges: state.fetchNodesEdges,
    setRfInstance: state.setRfInstance,
    toggleSelectedByNodeId: state.toggleSelectedByNodeId,
    setUpdateEdges: state.setUpdateEdges,
  })),
);

export default useWorkInProgressDiagram;

