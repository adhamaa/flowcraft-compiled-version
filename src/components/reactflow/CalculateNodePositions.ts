import { Edge, Node } from "reactflow";

export function calculateNodePositions(initialNodes: Node[], initialEdges: Edge[], options?: {
  horizontalSpacing?: number;
  verticalSpacing?: number;
  nodeWidth?: number;
  nodeHeight?: number;
}): Node[] {
  // Step 1: Identify Levels
  const levels: { [key: string]: number } = {}; // Dictionary to hold the level of each node
  const visited = new Set<string>(); // Set to track visited nodes
  const queue: { id: string; level: number }[] = [{ id: initialNodes[0].id, level: 0 }]; // Queue for BFS, starting with the first node at level 0
  levels[initialNodes[0].id] = 0; // Assign level 0 to the first node
  visited.add(initialNodes[0].id); // Mark the first node as visited

  // Perform BFS to determine levels of each node
  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    for (const edge of initialEdges) {
      if (edge.source === id && !visited.has(edge.target)) {
        visited.add(edge.target); // Mark the target node as visited
        levels[edge.target] = level + 1; // Assign the target node to the next level
        queue.push({ id: edge.target, level: level + 1 }); // Add the target node to the queue
      }
    }
  }

  // Step 2: Assign Positions
  const levelNodes: { [key: number]: string[] } = {}; // Dictionary to group nodes by their levels
  for (const [id, level] of Object.entries(levels)) {
    if (!levelNodes[level]) levelNodes[level] = [];
    levelNodes[level].push(id); // Add the node to the appropriate level group
  }

  // Find the maximum width and height among all nodes
  const nodeWidth = options?.nodeWidth ?? Math.max(...initialNodes.map(node => node.width!));
  const nodeHeight = options?.nodeHeight ?? Math.max(...initialNodes.map(node => node.height!));
  const horizontalSpacing = options?.horizontalSpacing ?? 50;
  const verticalSpacing = options?.verticalSpacing ?? 100;

  const maxNodesInLevel = Math.max(...Object.values(levelNodes).map(nodes => nodes.length)); // Find the maximum number of nodes in any level

  // Iterate through each level and assign positions to nodes
  for (const [level, nodes] of Object.entries(levelNodes)) {
    const y = parseInt(level) * (nodeHeight + verticalSpacing); // Calculate y position based on the level
    const totalWidth = nodes.length * nodeWidth + (nodes.length - 1) * horizontalSpacing; // Calculate total width required for the nodes in the level
    let xOffset = (maxNodesInLevel * (nodeWidth + horizontalSpacing) - totalWidth) / 2; // Calculate the starting x position to center the nodes

    for (const nodeId of nodes) {
      const node = initialNodes.find(node => node.id === nodeId); // Find the node by its ID
      if (node) {
        node.position.x = xOffset; // Assign x position
        node.position.y = y; // Assign y position
        xOffset += node.width! + horizontalSpacing; // Update xOffset for the next node
      }
    }
  }

  return initialNodes; // Return the nodes with updated positions
};