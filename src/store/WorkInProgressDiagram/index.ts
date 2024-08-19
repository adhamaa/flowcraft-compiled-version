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
import { Apps_label, getDeletedStageList, getDiagramData, restructureBizProcess } from '@/lib/service';
import { useShallow } from 'zustand/react/shallow';
import { ComboboxItem } from '@mantine/core';
import { convertToCycleStages } from '@/lib/helper';
import { ActionType } from '@/app/cycle/restructure/[cycle_uuid]/_component/workspace/WorkInProgress/hooks/useActionIcons';
import { FormValues } from '@/app/cycle/restructure/[cycle_uuid]/_component/workspace/WorkInProgress/FlowObjects';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';
import { CycleData } from '@/components/HomeContent';
import { revalidateCustomPath } from '@/actions/revalidatePath';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250; // horizontal space between nodes
const nodeHeight = 200; // vertical space between nodes

type RFState = {
  flowKey: string | undefined;
  currentCycleInfo: Record<string, CycleData>;
  nodes: Node[];
  edges: Edge[];
  rfInstance: ReactFlowInstance | null;
  getSelectedNodeId: () => string | undefined;
  deselectAllNodes: () => void;
  getInputOptionsByNodesId: (nodesId: string[]) => ComboboxItem[];
  getInputOptions: (data?: Record<string, string>[]) => ComboboxItem[];
  getPreviousInputOptions: () => ComboboxItem[];
  getNextInputOptions: () => ComboboxItem[];
  getPreviousNodesId: (nodeId?: string) => string[];
  getNextNodesId: (nodeId?: string) => string[];
  // getAllEdgesByNodeId: (nodeId?: string) => Edge[];
  // getAllPreviousAndNextNodesId: (nodeId?: string) => string[];
  generateNodeId: () => string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onLayout: (direction: string | undefined) => void;
  onSave: (cycle_uuid: string, callback?: (...args: any[]) => void) => void;
  onDraft: () => void;
  onApply: (items: { action: ActionType; data: FormValues; callback?: (...args: any[]) => void }) => void;
  onAdd: (data: FormValues) => void;
  onReset: (callback?: (...args: any[]) => void) => void;
  onMove: (data: FormValues) => void;
  onDuplicate: (data: FormValues) => void;
  onDelete: () => void;
  onRestore: (data: FormValues) => void;
  onDisjoint: (data: FormValues) => void;
  setCycleInfo: (data: Record<string, any>) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setRfInstance: (rfInstance: ReactFlowInstance) => void;
  fetchNodesEdges: (props: { cycle_id: string; apps_label: Apps_label }) => Promise<void>;
  fetchDeletedNodes: (props: { cycle_id: string; apps_label: Apps_label }) => Promise<ComboboxItem[]>;
  toggleSelectedByNodeId: (nodeId: string) => void;
  updateEdges: (data: FormValues) => void;
  removeEdges: (nodeId: string) => void;
  removeEdgeById: (data: FormValues) => void;
  resetDiagramLocalStorage: () => void;
};

const storage: PersistStorage<Omit<RFState, 'flowKey'>> = {
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
      currentCycleInfo: {},
      nodes: initialNodes,
      edges: initialEdges,
      rfInstance: null,
      generateNodeId: () => crypto.randomUUID(),
      getSelectedNodeId: () => get().nodes.find((node) => node.selected)?.id,
      deselectAllNodes: () => {
        set({
          nodes: get().nodes.map((node) => ({
            ...node,
            selected: false,
          })),
        });
      },
      getInputOptionsByNodesId: (nodesId: string[]) => {
        const { nodes } = get();
        return nodes
          .filter((node) => nodesId.includes(node.id))
          .map((node) => ({
            value: node.id,
            label: node.data.label,
          }));
      },
      getInputOptions: (data) => {
        if (data) {
          return data.map((deletedData) => {
            return {
              value: deletedData.stage_uuid,
              label: deletedData.stage_name,
            }
          });
        } else {
          return get().nodes.map((node) => ({
            value: node.id,
            label: node.data.label,
          }))
        }
      },
      getPreviousInputOptions: () => {
        const selectedNodeId = get().getSelectedNodeId();
        const previousNodesId = get().getPreviousNodesId(selectedNodeId);

        return get().getInputOptionsByNodesId(previousNodesId);
      },
      getNextInputOptions: () => {
        const selectedNodeId = get().getSelectedNodeId();
        const nextNodesId = get().getNextNodesId(selectedNodeId);

        return get().getInputOptionsByNodesId(nextNodesId);
      },
      getPreviousNodesId: (nodeId?: string) => {
        const { nodes, edges } = get();
        nodeId = nodeId ?? nodes.find((node) => node.selected)?.id;

        const previousEdges = edges.filter((edge) => edge.target === nodeId);
        return previousEdges.map((edge) => edge.source);
      },
      getNextNodesId: (nodeId?: string) => {
        const { nodes, edges } = get();
        nodeId = nodeId ?? nodes.find((node) => node.selected)?.id;

        const nextEdges = edges.filter((edge) => edge.source === nodeId);
        return nextEdges.map((edge) => edge.target);
      },
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
      onSave: async (cycle_uuid, callback) => {

        const setToDraft = get().onDraft;
        modals.openConfirmModal({
          title: 'Save Cycle',
          children: 'Are you confirm to save this cycle to the latest one? ',
          labels: { cancel: 'Cancel', confirm: 'Save' },
          radius: 'md',
          size: 'sm',
          overlayProps: {
            backgroundOpacity: 0.55,
            blur: 10,
          },
          withCloseButton: false,
          confirmProps: {
            color: 'var(--fc-brand-700)',
          },
          cancelProps: {
            color: 'var(--fc-neutral-900)',
            variant: 'light',
          },
          groupProps: {
            justify: 'center',
            pb: 'md',
          },
          classNames: {
            content: 'w-96',
            header: '',
            title: 'text-2xl font-semibold text-center w-full p-2',
            body: 'flex flex-col text-center justify-center gap-6 mx-auto',
          },
          onConfirm: async () => {

            try {
              if (!cycle_uuid) throw new Error('Cycle UUID is required.');

              const ApiFormat = convertToCycleStages(get().nodes, get().edges);

              setToDraft();
              await restructureBizProcess({ cycle_uuid: cycle_uuid, body: ApiFormat }).then((res) => {
                if (res.error) throw new Error(res.error_message);

                toast.success(res.message);
                callback?.({
                  success: true,
                  message: res.message,
                  data: { cycle_uuid, ...ApiFormat },
                });

                return;
              });

            } catch (error: any) {
              toast.error(error.message ?? 'An error occurred while saving the cycle.');
            }
          },
        });



      },
      onDraft: () => {
        const instance = get().rfInstance;
        const key = get().flowKey as string;

        if (instance) {
          const flow = instance.toObject();
          localStorage.setItem(key, JSON.stringify(flow));
        }
      },
      onApply: ({ action, data, callback }) => {
        const addNode = get().onAdd;
        const moveNode = get().onMove;
        const duplicateNode = get().onDuplicate;
        const deleteNode = get().onDelete;
        const restoreNode = get().onRestore;
        const disjointNode = get().onDisjoint;

        switch (action) {
          case 'add':
            addNode(data);
            break;
          case 'move':
            moveNode(data);
            break;
          case 'duplicate':
            duplicateNode(data);
            break;
          case 'delete':
            deleteNode();
            break;
          case 'restore':
            restoreNode(data);
            break;
          case 'disjoint':
            disjointNode(data);
            break;
          default:
            break;
        }

        if (typeof callback === 'function') callback();

      },
      onReset: (callback) => {
        const instance = get().rfInstance;
        const key = get().flowKey as string;

        const restoreFlow = async () => {
          const flow = JSON.parse(localStorage.getItem(key) as string);

          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            set({ nodes: flow.nodes || [], edges: flow.edges || [] });
            instance?.setViewport({ x, y, zoom });

            if (typeof callback === 'function') callback();
            // toast.success('Cycle has been reset successfully.');
          }
        };

        modals.openConfirmModal({
          title: 'Reset Cycle',
          children: 'Are you sure you want to reset this cycle to the previous one? You can’t undo this action.',
          labels: { cancel: 'Cancel', confirm: 'Reset' },
          radius: 'md',
          size: 'sm',
          overlayProps: {
            backgroundOpacity: 0.55,
            blur: 10,
          },
          withCloseButton: false,
          confirmProps: {
            color: 'var(--fc-brand-700)',
          },
          cancelProps: {
            color: 'var(--fc-neutral-900)',
            variant: 'light',
          },
          groupProps: {
            justify: 'center',
            pb: 'md',
          },
          classNames: {
            content: 'w-96',
            header: '',
            title: 'text-2xl font-semibold text-center w-full p-2',
            body: 'flex flex-col text-center justify-center gap-6 mx-auto',
          },
          onConfirm: restoreFlow,
        });
      },
      onAdd: (data) => {
        const { curr_stage_name: stage_name = 'New Node', previous_stage, next_stage } = data;
        const updateEdges = get().updateEdges;
        try {
          if (!stage_name) throw new Error('Stage name is required.');

          const uuid = get().generateNodeId();
          const node = {
            id: uuid,
            type: 'Standard', // 'Standard' | 'Start' | 'WithEntryAndExit' | 'WithEntry'| 'WithExit' | 'End'  
            data: { label: stage_name },
            position: {
              x: Math.random() * window.innerWidth - 50,
              y: Math.random() * window.innerHeight - 50,
            },
          };

          set({ nodes: [...get().nodes, node] });

          if (previous_stage || next_stage) {
            updateEdges({ ...data, curr_stage_uuid: uuid });
          }

        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onMove: (data) => {
        const { previous_stage, next_stage } = data;
        const { nodes, removeEdges, updateEdges } = get();
        const selectedNodeId = nodes.find((node) => node.selected)?.id;

        try {
          if (!selectedNodeId) throw new Error('No selected stage found or stage does not exist.');

          if (previous_stage.length === 0 && next_stage.length === 0) throw new Error('Pick at least one previous or next stage to move the selected stage.');

          removeEdges(selectedNodeId as string);

          updateEdges(data);
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onDuplicate: (data) => {
        const { previous_stage, next_stage } = data;

        const uuid = get().generateNodeId();
        const { nodes, updateEdges } = get();

        const selectedNodes = nodes.filter((node) => node.selected);

        try {
          if (selectedNodes.length === 0) {
            throw new Error('No selected stage found or stage does not exist.');
          }

          selectedNodes.forEach((node) => {
            const position = {
              x: node.position.x + 50,
              y: node.position.y + 50,
            };

            const newNode = {
              ...node,
              data: { ...node.data, label: `${node.data.label}-Copy`, duplicate_from: node.id },
              selected: false,
              dragging: false,
              id: uuid,
              position,
            };

            set({ nodes: [...nodes, newNode] });

            if (previous_stage || next_stage) {
              updateEdges({ ...data, curr_stage_uuid: uuid });
            }

          });
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onDelete: () => {
        const { nodes, edges } = get();
        const selectedNodes = nodes.filter((node) => node.selected);

        try {

          if (selectedNodes.length === 0) {
            throw new Error('No selected stage found or stage does not exist.');
          }

          modals.openConfirmModal({
            title: 'Delete Stage',
            children: 'Are you sure you want to delete the selected stage?',
            labels: { cancel: 'Cancel', confirm: 'Delete' },
            radius: 'md',
            size: 'sm',
            overlayProps: {
              backgroundOpacity: 0.55,
              blur: 10,
            },
            withCloseButton: false,
            confirmProps: {
              color: 'var(--fc-brand-700)',
            },
            cancelProps: {
              color: 'var(--fc-neutral-900)',
              variant: 'light',
            },
            groupProps: {
              justify: 'center',
              pb: 'md',
            },
            classNames: {
              content: 'w-96',
              header: '',
              title: 'text-2xl font-semibold text-center w-full p-2',
              body: 'flex flex-col text-center justify-center gap-6 mx-auto',
            },
            onConfirm: () => {
              const newNodes = nodes.filter((node) => !node.selected);
              const newEdges = edges.filter((edge) => {
                return !selectedNodes.some((node) => node.id === edge.source || node.id === edge.target);
              });

              set({ nodes: newNodes, edges: newEdges });
            },
          });
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onRestore: (data) => {
        const { previous_stage, next_stage, curr_stage_uuid, curr_stage_name } = data;
        const { nodes, updateEdges } = get();

        try {
          if (!curr_stage_uuid) throw new Error('No selected stage found or stage does not exist.');

          // Create a new node
          const newNode = {
            id: curr_stage_uuid as string,
            data: { label: curr_stage_name },
            type: 'Standard',
            position: {
              x: Math.random() * window.innerWidth - 50,
              y: Math.random() * window.innerHeight - 50,
            },
          };

          // Add the new node to the nodes array
          const updatedNodes = [...nodes, newNode];
          set({ nodes: updatedNodes });

          // If there are previous or next stages, update the edges
          if (previous_stage || next_stage) {
            // Prepare data for updating edges
            const edgeData = { ...data };

            // Update edges
            updateEdges(edgeData);
          }

        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onDisjoint: (data) => {
        try {
          const removeEdgesById = get().removeEdgeById;
          const selectedNodes = get().nodes.filter((node) => node.selected);
          const { previous_stage, next_stage } = data;

          if (selectedNodes.length === 0) throw new Error('No selected stage found or stage does not exist.');

          if (previous_stage.length === 0 && next_stage.length === 0) throw new Error('Pick at least one previous or next stage to disjoint.');

          removeEdgesById(data);
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      setCycleInfo: (data) => {
        set({ currentCycleInfo: data });
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
      updateEdges: (data) => {
        const { previous_stage, next_stage, curr_stage_uuid } = data;
        const { edges } = get();

        // Function to generate unique IDs for edges
        let edgeIdCounter = edges.length > 0 ? Math.max(...edges.map(edge => edge.id) as any) : 0;
        const generateEdgeId = () => ++edgeIdCounter;

        const createEdge = (source: string, target: string) => {
          const edgeId = generateEdgeId();

          return {
            id: edgeId as any,
            source,
            target,
            type: ConnectionLineType.SmoothStep,
            animated: false,
          };
        };

        try {
          const prev2curr = previous_stage?.map((prev: string) => createEdge(prev, curr_stage_uuid!)) || [];
          const curr2next = next_stage?.map((next: string) => createEdge(curr_stage_uuid!, next)) || [];

          const combinedEdges = [...prev2curr, ...curr2next];

          set({ edges: [...edges, ...combinedEdges] });
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      removeEdges: (nodeId: string) => {
        try {
          const edges = get().edges;
          const updatedEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

          if (edges.length === updatedEdges.length) {
            throw new Error(`No edges found for node with id ${nodeId}.`);
          }

          set({ edges: updatedEdges });
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      removeEdgeById: (data) => {
        try {
          const { edges, getSelectedNodeId } = get();

          const selectedNodeId = getSelectedNodeId();

          const previousEdges = data.previous_stage || [];  // Ensure it's an array of edge IDs
          const nextEdges = data.next_stage || [];          // Ensure it's an array of edge IDs

          // Function to determine if an edge should be removed
          const filterRemoveEdge = (edge: Edge) => {
            return !((previousEdges.includes(edge.source) || nextEdges.includes(edge.target)) && (edge.source === selectedNodeId || edge.target === selectedNodeId));
          };

          // Filter out edges that should not be removed
          const updatedEdges = edges.filter((edge) => filterRemoveEdge(edge));

          // Update the state with the filtered edges
          set({ edges: updatedEdges });

        } catch (error: any) {
          toast.error(error.message);
        }
      },
      fetchNodesEdges: async ({
        cycle_id,
        apps_label,
      }) => {
        const setToDraft = get().onDraft;

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

        setToDraft();
      },
      fetchDeletedNodes: async ({
        cycle_id,
        apps_label,
      }) => {
        const deletedNodes = await getDeletedStageList({ cycle_id, apps_label });
        const convertedDeletedNodes = await get().getInputOptions(deletedNodes);

        return convertedDeletedNodes;
      },
      resetDiagramLocalStorage: () => {
        const key = get().flowKey as string;
        localStorage.removeItem(key);
        localStorage.removeItem('wip-diagram-storage');
      }
    }),
    {
      name: 'wip-diagram-storage',
      storage,
      partialize: ({ flowKey, ...state }) => ({ ...state, rfInstance: null }),
      // partialize: (state) => Object.fromEntries(
      //   Object.entries(state).filter(([key]) => !['flowKey'].includes(key)),
      // ),
    },
  ),
);

const useWorkInProgressDiagram = () => useDiagramStore(
  useShallow((state: RFState) => ({
    currentCycleInfo: state.currentCycleInfo,
    nodes: state.nodes,
    edges: state.edges,
    getSelectedNodeId: state.getSelectedNodeId,
    getPreviousNodesId: state.getPreviousNodesId,
    getNextNodesId: state.getNextNodesId,
    deselectAllNodes: state.deselectAllNodes,
    getInputOptions: state.getInputOptions,
    getPreviousInputOptions: state.getPreviousInputOptions,
    getNextInputOptions: state.getNextInputOptions,
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
    fetchDeletedNodes: state.fetchDeletedNodes,
    setRfInstance: state.setRfInstance,
    setCycleInfo: state.setCycleInfo,
    toggleSelectedByNodeId: state.toggleSelectedByNodeId,
    updateEdges: state.updateEdges,
    removeEdges: state.removeEdges,
    resetDiagramLocalStorage: state.resetDiagramLocalStorage,
  })),
);

export default useWorkInProgressDiagram;

