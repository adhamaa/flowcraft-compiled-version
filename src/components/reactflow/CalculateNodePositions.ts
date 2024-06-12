import { Edge, Node } from "reactflow";

function CalculateNodePositions(nodes: Node[], edges: Edge[]): { nodes: Node[], edges: Edge[] } {
  const nodePositions: { [key: string]: Node } = {};

  const horizontalPadding: number = 100; // Padding between nodes horizontally
  const verticalPadding: number = 100; // Padding between nodes vertically

  const calculateNodePosition = (node: Node, parentPosition: Node | null): Node => {
    const parentX = parentPosition ? parentPosition.position.x : 0;
    const parentY = parentPosition ? parentPosition.position.y : 0;

    let xOffset = parentX;
    let yOffset = parentY;

    const nodeWidth = node.width || 0;
    const nodeHeight = node.height || 0;

    if (parentPosition) {
      // Center the node below its parent if it has siblings
      xOffset = parentX - (nodeWidth / 2);

      const siblings = edges.filter(edge => edge.source === parentPosition.id);
      const siblingIndex = siblings.findIndex(sibling => sibling.target === node.id);
      const siblingsCount = siblings.length;

      if (siblingsCount % 2 === 0) {
        // Even number of siblings
        xOffset += (siblingIndex - siblingsCount / 2 + 0.5) * (nodeWidth + horizontalPadding);
      } else {
        // Odd number of siblings
        xOffset += (siblingIndex - Math.floor(siblingsCount / 2)) * (nodeWidth + horizontalPadding);
      }

      yOffset = parentY + nodeHeight + verticalPadding;
    }

    return { ...node, position: { x: xOffset, y: yOffset } };
  };

  const traverseTree = (node: Node, parentPosition: Node | null) => {
    const nodeWithPosition = calculateNodePosition(node, parentPosition);
    nodePositions[node.id] = nodeWithPosition;

    const children = edges.filter((edge) => edge.source === node.id);
    children.forEach((childEdge) => {
      const childNode = nodes.find((n) => n.id === childEdge.target);
      if (childNode) {
        traverseTree(childNode, nodeWithPosition);
      }
    });

    return nodeWithPosition;
  };

  // Start traversal from the root node
  const rootNode = nodes.find((node) => node.type === 'Start');
  if (rootNode) {
    traverseTree(rootNode, null);
  }

  return { nodes: Object.values(nodePositions), edges };
};

export default CalculateNodePositions;

export function calculateNodePositions2(nodes: Node[], edges: Edge[]): Node[] {
  const nodePositions: { [key: string]: Node } = {};

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateNodePosition = (node: Node, parentPosition: Node | null): Node => {
    const parentX = parentPosition ? parentPosition.position.x : 0;
    const parentY = parentPosition ? parentPosition.position.y : 0;

    let xOffset = parentX;
    let yOffset = parentY;

    const nodeWidth = node.width || 0;
    const nodeHeight = node.height || 0;

    if (parentPosition) {
      yOffset = parentY + nodeHeight + verticalPadding;

      const siblings = edges.filter(edge => edge.source === parentPosition.id);
      const siblingIndex = siblings.findIndex(sibling => sibling.target === node.id);
      const siblingsCount = siblings.length;

      if (siblingsCount > 1) {
        const totalWidth = siblingsCount * nodeWidth + (siblingsCount - 1) * horizontalPadding;
        xOffset = parentX - totalWidth / 2 + siblingIndex * (nodeWidth + horizontalPadding) + nodeWidth / 2;
      } else {
        xOffset = parentX;
      }
    }

    return { ...node, position: { x: xOffset, y: yOffset } };
  };

  const traverseTree = (node: Node, parentPosition: Node | null) => {
    const nodeWithPosition = calculateNodePosition(node, parentPosition);
    nodePositions[node.id] = nodeWithPosition;

    const children = edges.filter(edge => edge.source === node.id);
    children.forEach(childEdge => {
      const childNode = nodes.find(n => n.id === childEdge.target);
      if (childNode) {
        traverseTree(childNode, nodeWithPosition);
      }
    });

    return nodeWithPosition;
  };

  // Start traversal from the root node
  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    traverseTree(rootNode, null);
  }

  return nodes.map(node => nodePositions[node.id]);
}

export function calculateNodePositions3(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap: { [id: string]: Node } = {};
  nodes.forEach(node => nodeMap[node.id] = node);

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateTreeWidth = (node: Node): number => {
    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) {
      return node.width!;
    }
    let totalWidth = -horizontalPadding;
    childrenNodes.forEach(child => {
      totalWidth += calculateTreeWidth(child) + horizontalPadding;
    });
    return totalWidth;
  };

  const setPosition = (node: Node, x: number, y: number): void => {
    node.position = { x, y };

    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) return;

    const totalWidth = calculateTreeWidth(node);
    let currentX = x - totalWidth / 2;

    childrenNodes.forEach(child => {
      const childWidth = calculateTreeWidth(child);
      setPosition(child, currentX + childWidth / 2, y + node.height! + verticalPadding);
      currentX += childWidth + horizontalPadding;
    });
  };

  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    setPosition(rootNode, 0, 0);
  }

  return nodes;
}

export function calculateNodePositions4(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap: { [id: string]: Node } = {};
  nodes.forEach(node => nodeMap[node.id] = node);

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateSubtreeWidth = (node: Node): number => {
    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) {
      return node.width!;
    }
    let totalWidth = -horizontalPadding;
    childrenNodes.forEach(child => {
      totalWidth += calculateSubtreeWidth(child) + horizontalPadding;
    });
    return totalWidth;
  };

  const setPosition = (node: Node, x: number, y: number): void => {
    node.position = { x, y };

    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) return;

    const totalWidth = calculateSubtreeWidth(node);
    let currentX = x - totalWidth / 2;

    childrenNodes.forEach(child => {
      const childWidth = calculateSubtreeWidth(child);
      setPosition(child, currentX + childWidth / 2, y + node.height! + verticalPadding);
      currentX += childWidth + horizontalPadding;
    });
  };

  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    const initialX = 0; // Starting X position
    const initialY = 0; // Starting Y position
    setPosition(rootNode, initialX, initialY);
  }

  return nodes;
}


export function calculateNodePositions5(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap: { [id: string]: Node } = {};
  nodes.forEach(node => nodeMap[node.id] = node);

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateSubtreeWidth = (node: Node): number => {
    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) {
      return node.width!;
    }
    let totalWidth = -horizontalPadding;
    childrenNodes.forEach(child => {
      totalWidth += calculateSubtreeWidth(child) + horizontalPadding;
    });
    return totalWidth;
  };

  const setPosition = (node: Node, x: number, y: number): void => {
    node.position = { x, y };

    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) return;

    const totalWidth = calculateSubtreeWidth(node);
    let currentX = x - totalWidth / 2;

    childrenNodes.forEach(child => {
      const childWidth = calculateSubtreeWidth(child);
      setPosition(child, currentX + childWidth / 2, y + node.height! + verticalPadding);
      currentX += childWidth + horizontalPadding;
    });
  };

  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    const initialX = 0; // Starting X position
    const initialY = 0; // Starting Y position
    setPosition(rootNode, initialX, initialY);
  }

  return nodes;
}

export function calculateNodePositions6(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap: { [id: string]: Node } = {};
  nodes.forEach(node => nodeMap[node.id] = node);

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateSubtreeWidth = (node: Node): number => {
    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) {
      return node.width!;
    }
    let totalWidth = -horizontalPadding;
    childrenNodes.forEach(child => {
      totalWidth += calculateSubtreeWidth(child) + horizontalPadding;
    });
    return totalWidth;
  };

  const findParent = (childId: string): Node | undefined => {
    const parentEdge = edges.find(edge => edge.target === childId);
    return parentEdge ? nodeMap[parentEdge.source] : undefined;
  };

  const findSiblings = (node: Node): Node[] => {
    const parent = findParent(node.id);
    if (!parent) return [];
    const siblingEdges = edges.filter(edge => edge.source === parent.id && edge.target !== node.id);
    return siblingEdges.map(edge => nodeMap[edge.target]);
  };

  const setPosition = (node: Node, x: number, y: number): void => {
    node.position = { x, y };

    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) return;

    const totalWidth = calculateSubtreeWidth(node);
    let currentX = x - totalWidth / 2;

    const numChildren = childrenNodes.length;
    const isEven = numChildren % 2 === 0;

    childrenNodes.forEach((child, index) => {
      const childWidth = calculateSubtreeWidth(child);
      const parentSiblings = findSiblings(node);
      const parentCenterX = parentSiblings.length > 0 ? (parentSiblings.reduce((sum, sib) => sum + sib.position.x, 0) / parentSiblings.length) : x;

      if (isEven) {
        setPosition(child, parentCenterX + (index - numChildren / 2 + 0.5) * (childWidth + horizontalPadding), y + node.height! + verticalPadding);
      } else {
        setPosition(child, parentCenterX + (index - Math.floor(numChildren / 2)) * (childWidth + horizontalPadding), y + node.height! + verticalPadding);
      }
      currentX += childWidth + horizontalPadding;
    });
  };

  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    const initialX = 0; // Starting X position
    const initialY = 0; // Starting Y position
    setPosition(rootNode, initialX, initialY);
  }

  return nodes;
}

export function calculateNodePositions7(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap: { [id: string]: Node } = {};
  nodes.forEach(node => nodeMap[node.id] = node);

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateSubtreeWidth = (node: Node): number => {
    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) {
      return node.width!;
    }
    let totalWidth = -horizontalPadding;
    childrenNodes.forEach(child => {
      totalWidth += calculateSubtreeWidth(child) + horizontalPadding;
    });
    return totalWidth;
  };

  const findParent = (childId: string): Node | undefined => {
    const parentEdge = edges.find(edge => edge.target === childId);
    return parentEdge ? nodeMap[parentEdge.source] : undefined;
  };

  const findSiblings = (node: Node): Node[] => {
    const parent = findParent(node.id);
    if (!parent) return [];
    const siblingEdges = edges.filter(edge => edge.source === parent.id && edge.target !== node.id);
    return siblingEdges.map(edge => nodeMap[edge.target]);
  };

  const setPosition = (node: Node, x: number, y: number): void => {
    node.position = { x, y };

    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) return;

    const totalWidth = calculateSubtreeWidth(node);
    let currentX = x - totalWidth / 2;

    const numChildren = childrenNodes.length;
    const isEven = numChildren % 2 === 0;

    childrenNodes.forEach((child, index) => {
      const childWidth = calculateSubtreeWidth(child);
      const parentSiblings = findSiblings(node);
      const numParentSiblings = parentSiblings.length;
      let parentCenterX = x;

      if (numParentSiblings > 0) {
        if (numParentSiblings % 2 === 0) {
          const middleLeftSibling = parentSiblings[Math.floor((numParentSiblings - 1) / 2)];
          const middleRightSibling = parentSiblings[Math.floor(numParentSiblings / 2)];
          parentCenterX = (middleLeftSibling.position.x + middleRightSibling.position.x) / 2;
        } else {
          parentCenterX = parentSiblings[Math.floor(numParentSiblings / 2)].position.x;
        }
      }

      if (isEven) {
        setPosition(child, parentCenterX + (index - numChildren / 2 + 0.5) * (childWidth + horizontalPadding), y + node.height! + verticalPadding);
      } else {
        setPosition(child, parentCenterX + (index - Math.floor(numChildren / 2)) * (childWidth + horizontalPadding), y + node.height! + verticalPadding);
      }
      currentX += childWidth + horizontalPadding;
    });
  };

  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    const initialX = 0; // Starting X position
    const initialY = 0; // Starting Y position
    setPosition(rootNode, initialX, initialY);
  }

  return nodes;
}

//  a function to re-position nodes that have the same y-coordinate value so that they're not stacking with each other
export function AdjustXCoordinates(data: any[]): any[] {
  // Find unique y-axis values from the data
  const uniqueYValues = Array.from(
    new Set(data?.map((item) => item.position.y))
  );

  for (const yValue of uniqueYValues) {
    // Get the objects that have the same y-axis value
    const objectsWithSameY = data.filter(
      (item) => item.position.y === yValue
    );

    // Determine the total number of objects and the center index
    const totalObjects = objectsWithSameY.length;

    const centerIndex = Math.floor(totalObjects / 2);

    // Get the center object and calculate the available width
    const centerObject = objectsWithSameY[centerIndex];
    const availableWidth = 600; // Adjust this value based on your desired width
    const isEvenTotal = totalObjects % 2 === 0;
    const directionMultiplier = isEvenTotal ? -1 : 1;
    // Calculate the increment for distributing the objects evenly
    const increment =
      totalObjects > 1 ? availableWidth / (totalObjects - 1) : 0;

    // --------------- right side (by default) ------------
    // index return 0
    let offset = isEvenTotal ? increment * 0.5 : 0;
    let direction = directionMultiplier;

    // index return 1
    for (let i = centerIndex; i >= 0; i--) {
      objectsWithSameY[i].position.x =
        centerObject.position.x + direction * offset;
      offset -= isEvenTotal ? increment * -0.5 : increment;
      direction *= -1;
    }
    // --------------- left side (by default) ------------
    // for index that return 0
    offset = isEvenTotal ? increment * 0.5 : increment;
    direction = directionMultiplier * -1;

    // for index that return 1
    for (let i = centerIndex + 1; i < totalObjects; i++) {
      objectsWithSameY[i].position.x =
        centerObject.position.x + direction * offset;
      offset += increment;
      direction *= 1;
    }
  }

  return data;
}

export function calculateNodePositions8(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap: { [id: string]: Node } = {};
  nodes.forEach(node => nodeMap[node.id] = node);

  const horizontalPadding = 100; // Padding between nodes horizontally
  const verticalPadding = 150; // Padding between nodes vertically

  const calculateSubtreeWidth = (node: Node): number => {
    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) {
      return node.width!;
    }
    let totalWidth = -horizontalPadding;
    childrenNodes.forEach(child => {
      totalWidth += calculateSubtreeWidth(child) + horizontalPadding;
    });
    return totalWidth;
  };

  const findParent = (childId: string): Node | undefined => {
    const parentEdge = edges.find(edge => edge.target === childId);
    return parentEdge ? nodeMap[parentEdge.source] : undefined;
  };

  const findSiblings = (node: Node): Node[] => {
    const parent = findParent(node.id);
    if (!parent) return [];
    const siblingEdges = edges.filter(edge => edge.source === parent.id && edge.target !== node.id);
    return siblingEdges.map(edge => nodeMap[edge.target]);
  };

  const setPosition = (node: Node, x: number, y: number): void => {
    node.position = { x, y };

    const childrenEdges = edges.filter(edge => edge.source === node.id);
    const childrenNodes = childrenEdges.map(edge => nodeMap[edge.target]);
    if (childrenNodes.length === 0) return;

    const totalWidth = calculateSubtreeWidth(node);
    let currentX = x - totalWidth / 2;

    const numChildren = childrenNodes.length;
    const isEven = numChildren % 2 === 0;

    childrenNodes.forEach((child, index) => {
      const childWidth = calculateSubtreeWidth(child);
      const parentSiblings = findSiblings(node);
      const numParentSiblings = parentSiblings.length;
      let parentCenterX = x;

      if (numParentSiblings > 0) {
        if (numParentSiblings % 2 === 0) {
          const middleLeftSibling = parentSiblings[Math.floor((numParentSiblings - 1) / 2)];
          const middleRightSibling = parentSiblings[Math.floor(numParentSiblings / 2)];
          parentCenterX = (middleLeftSibling.position.x + middleRightSibling.position.x) / 2;
        } else {
          parentCenterX = parentSiblings[Math.floor(numParentSiblings / 2)].position.x;
        }
      }

      if (numParentSiblings === 0) {
        setPosition(child, x, y + node.height! + verticalPadding);
      } else {
        if (isEven) {
          setPosition(child, parentCenterX + (index - numChildren / 2 + 0.5) * (childWidth + horizontalPadding), y + node.height! + verticalPadding);
        } else {
          setPosition(child, parentCenterX + (index - Math.floor(numChildren / 2)) * (childWidth + horizontalPadding), y + node.height! + verticalPadding);
        }
      }
      currentX += childWidth + horizontalPadding;
    });
  };

  const rootNode = nodes.find(node => node.type === 'Start');
  if (rootNode) {
    const initialX = 0; // Starting X position
    const initialY = 0; // Starting Y position
    setPosition(rootNode, initialX, initialY);
  }

  return nodes;
}   