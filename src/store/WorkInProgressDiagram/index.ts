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
import { ActionType } from '@/app/cycle/restructure/[cycle_uuid]/_component/workspace/WorkInProgress/hooks/useActionIcons';
import { FormValues } from '@/app/cycle/restructure/[cycle_uuid]/_component/workspace/WorkInProgress/FlowObjects';
import toast from '@/components/toast';
import { modals } from '@mantine/modals';

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
  deselectAllNodes: () => void;
  getInputOptions: () => ComboboxItem[];
  getInputOptionsByNodesId: (nodesId: string[]) => ComboboxItem[];
  getPreviousNodesId: (nodeId?: string) => string[];
  getNextNodesId: (nodeId?: string) => string[];
  // getAllEdgesByNodeId: (nodeId?: string) => Edge[];
  // getAllPreviousAndNextNodesId: (nodeId?: string) => string[];
  generateNodeId: () => string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onLayout: (direction: string | undefined) => void;
  onSave: () => void;
  onDraft: () => void;
  onApply: (items: { action: ActionType; data: FormValues; callback?: (...args: any[]) => void }) => void;
  onAdd: (data: FormValues) => void;
  onReset: (callback?: (...args: any[]) => void) => void;
  onMove: (data: FormValues) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onDisjoint: (data: FormValues) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setRfInstance: (rfInstance: ReactFlowInstance) => void;
  fetchNodesEdges: (props: { cycle_id: string; apps_label: Apps_label }) => Promise<void>;
  toggleSelectedByNodeId: (nodeId: string) => void;
  updateEdges: (data: FormValues) => void;
  removeEdges: (nodeId: string) => void;
  removeEdgeById: (data: FormValues) => void;
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
      getInputOptions: () => get().nodes.map((node) => ({
        value: node.id,
        label: node.data.label,
      })),
      getInputOptionsByNodesId: (nodesId: string[]) => {
        const { nodes } = get();
        return nodes
          .filter((node) => nodesId.includes(node.id))
          .map((node) => ({
            value: node.id,
            label: node.data.label,
          }));
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
      // getAllEdgesByNodeId: (nodeId?: string) => {
      //   const { edges } = get();
      //   nodeId = nodeId ?? get().getSelectedNodeId();

      //   return edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);
      // },
      // getAllPreviousAndNextNodesId: (nodeId?: string) => {
      //   const { edges } = get();
      //   nodeId = nodeId ?? get().getSelectedNodeId();

      //   const allEdgesNodesId = edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);
      //   return allEdgesNodesId.map((edge) => edge.source === nodeId ? edge.target : edge.source);
      // },
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
            color: '#895CF3',
          },
          cancelProps: {
            color: '#0F172A',
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
            const ApiFormat = convertToCycleStages(get().nodes, get().edges);

            setToDraft();
            console.log('ApiFormat:', ApiFormat);
          },
        });
      },
      onDraft: () => {
        const instance = get().rfInstance;
        const key = get().flowKey as string;

        if (instance) {
          // modals.openConfirmModal({
          //   title: 'Save Draft',
          //   children: 'Are you sure you want to save the current diagram as a draft?',
          //   labels: { cancel: 'Cancel', confirm: 'Save' },
          //   radius: 'md',
          //   size: 'sm',
          //   overlayProps: {
          //     backgroundOpacity: 0.55,
          //     blur: 10,
          //   },
          //   withCloseButton: false,
          //   confirmProps: {
          //     color: '#895CF3',
          //   },
          //   cancelProps: {
          //     color: '#0F172A',
          //     variant: 'light',
          //   },
          //   groupProps: {
          //     justify: 'center',
          //     pb: 'md',
          //   },
          //   classNames: {
          //     content: 'w-96',
          //     header: '',
          //     title: 'text-2xl font-semibold text-center w-full p-2',
          //     body: 'flex flex-col text-center justify-center gap-6 mx-auto',
          //   },
          //   onConfirm: () => {
          const flow = instance.toObject();
          localStorage.setItem(key, JSON.stringify(flow));
          //   },
          // });
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
            duplicateNode();
            break;
          case 'delete':
            deleteNode();
            break;
          case 'restore':
            console.log('restore')
            break;
          case 'disjoint':
            disjointNode(data);
            break;
          default:
            break;
        }


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
            color: '#895CF3',
          },
          cancelProps: {
            color: '#0F172A',
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
            type: 'WithEntryAndExit', // 'Start' | 'WithEntryAndExit' | 'WithEntry'| 'WithExit' | 'End'  
            data: { label: stage_name },
            position: {
              x: Math.random() * window.innerWidth - 100,
              y: Math.random() * window.innerHeight - 100,
            },
          };

          set({ nodes: [...get().nodes, node] });

        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onMove: (data) => {
        const updateEdges = get().updateEdges;
        const selectedNodes = get().nodes.filter((node) => node.selected);

        try {
          if (selectedNodes.length === 0) {
            throw new Error('No selected stage found or stage does not exist.');
          }

          updateEdges(data);
        } catch (error: any) {
          toast.error(error.message);
        }
      },
      onDuplicate: () => {
        const uuid = get().generateNodeId();
        const { nodes, edges } = get();
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
              color: '#895CF3',
            },
            cancelProps: {
              color: '#0F172A',
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
      onRestore: () => { console.log('restore') },
      onDisjoint: (data) => {
        // const removeEdges = get().removeEdges;
        // const { nodes, edges } = get();
        // const selectedNode = nodes.find((node) => node.selected);
        // console.log('selectedNode:', selectedNode)

        // removeEdges(selectedNode?.id as string);

        const selectedNodes = get().nodes.filter((node) => node.selected);

        try {
          if (selectedNodes.length === 0) {
            throw new Error('No selected stage found or stage does not exist.');
          }

          const prevStage = get().getPreviousNodesId();
          console.log('prevStage:', prevStage)
          const nextStage = get().getNextNodesId();
          console.log('nextStage:', nextStage)

          const arrOfinputOptions = get().getInputOptionsByNodesId(nextStage);
          console.log('arrOfinputOptions:', arrOfinputOptions)

          get().removeEdgeById(data);

        } catch (error: any) {
          toast.error(error.message);
        }

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

        const createEdge = (source: string, target: string) => {
          const edgeId = `${source}-${target}`;
          const existingEdge = get().edges.find((edge) => edge.id === edgeId);

          if (existingEdge) {
            throw new Error(`Edge with id ${edgeId} already exists.`);
          }

          return {
            id: edgeId,
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

          set({ edges: [...get().edges, ...combinedEdges] });
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
          const { nodes, edges } = get();

          const selectedNodeId = nodes.find((node) => node.selected)?.id;
          const edgesInSelectedNode = edges.filter((edge) => edge.source === selectedNodeId || edge.target === selectedNodeId);


          // if (edgeIndex === -1) {
          //   throw new Error(`Edge with id ${edgeId} does not exist.`);
          // }

          // const updatedEdges = [...edges];
          // updatedEdges.splice(edgeIndex, 1);

          // set({ edges: updatedEdges });
        } catch (error: any) {
          toast.error(error.message);
        }
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
      partialize: ({ flowKey, ...state }) => ({ ...state, rfInstance: null }),
      // partialize: (state) => Object.fromEntries(
      //   Object.entries(state).filter(([key]) => !['flowKey'].includes(key)),
      // ),
    },
  ),
);

const useWorkInProgressDiagram = () => useDiagramStore(
  useShallow((state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    getSelectedNodeId: state.getSelectedNodeId,
    deselectAllNodes: state.deselectAllNodes,
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
    updateEdges: state.updateEdges,
    removeEdges: state.removeEdges,
  })),
);

export default useWorkInProgressDiagram;

