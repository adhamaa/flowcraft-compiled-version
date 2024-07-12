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

// Define the breadcrumb type
type Breadcrumb = {
  title: string;
  href: string;
};

/**------------------------------------------------
 * Create a list of breadcrumbs from a URL
 * @param url - The URL to create breadcrumbs from
 * @returns Breadcrumb[] - A list of breadcrumbs
 -------------------------------------------------*/
export function createBreadcrumbs(url: string): Breadcrumb[] {
  // Parse the URL
  const parsedUrl = new URL(url);
  console.log('parsedUrl:', parsedUrl)
  const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.length > 0);
  console.log('pathSegments:', pathSegments)
  const queryParams = parsedUrl.searchParams;
  console.log('queryParams:', queryParams)

  // Start with the base path
  let path = '/';
  const breadcrumbs: Breadcrumb[] = [];

  // Map for readable labels based on URL segments or query parameters
  const segmentLabels: { [key: string]: string } = {
    home: 'Home',
    cycle: 'Cycle',
    stage: 'Stage',
    // Add more mappings if necessary
  };

  // Create breadcrumbs from path segments
  pathSegments.forEach((segment, index) => {
    path += `${segment}/`;
    const label = segmentLabels[segment] || segment;
    console.log('label:', label)
    breadcrumbs.push({ title: label, href: path });
  });

  // Handle query parameters as part of the breadcrumb path
  queryParams.forEach((value, key) => {
    const readableKey = key.replace('_', ' '); // Example transformation
    const label = `${readableKey}: ${value}`;
    breadcrumbs.push({ title: label, href: `${path}?${key}=${value}` });
  });

  return breadcrumbs;
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