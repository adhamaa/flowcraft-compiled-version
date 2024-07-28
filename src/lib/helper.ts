import { Edge, Node } from "reactflow";

/**------------------------------------------------
 * Check if an object is empty
 * @param objectName - The object to check if it is empty
 * @returns boolean - True if the object is empty, false otherwise
 ------------------------------------------------*/
export const isObjectEmpty = (objectName: { constructor?: any }) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

/**------------------------------------------------
 * Convert the nodes and edges of a cycle diagram to a list of cycle stages
 * @param nodes - The nodes of the cycle diagram
 * @param edges - The edges of the cycle diagram
 * @returns CycleStage[] - A list of cycle stages
 ------------------------------------------------*/
interface CycleStage {
  stage_name: string;
  stage_uuid: string;
  list_prev: string[];
  list_next: string[];
  duplicate_from?: string;
}

export function convertToCycleStages(nodes: Node[], edges: Edge[]): CycleStage[] {
  const stagesMap: { [uuid: string]: CycleStage } = {};

  // Initialize the stages with node data
  nodes.forEach(node => {
    stagesMap[node.id] = {
      stage_name: node.data.label,
      stage_uuid: node.id,
      list_prev: [],
      list_next: [],
      duplicate_from: node.data.duplicate_from ?? "",
    };
  });

  // Populate list_prev and list_next fields from edges
  edges.forEach(edge => {
    if (stagesMap[edge.target]) {
      stagesMap[edge.target].list_prev.push(edge.source);
    }
    if (stagesMap[edge.source]) {
      stagesMap[edge.source].list_next.push(edge.target);
    }
  });

  return Object.values(stagesMap);
};

// 