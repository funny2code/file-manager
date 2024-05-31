import { IdType } from "@/types/interfaces";
import { deleteNode, insertNode, updatePathTree } from "../../utils/traverseTree";

export const addNewFile = (
  state: any,
  newFolderData: any,
  addLengthToName = false
) => {
  if (addLengthToName) {
    newFolderData.name = `${newFolderData.name} ${
      state.subFolder?.length || 1
    }`;
  }

  const updateFolderTree = insertNode(
    state.data,
    newFolderData.parentId,
    newFolderData
  );

  const updatedSubFolder = state.subFolder;
  updatedSubFolder.push(newFolderData);

  if (newFolderData.parentId !== "root") {
    const newPathTree = updatePathTree(updateFolderTree, state.path);
    state.pathTree = newPathTree;
  }

  state.data = updateFolderTree;
  state.subFolder = updatedSubFolder;

  state.activeFolder = { id: newFolderData.id, editable: true };
  state.isLoading = false;

  return state;
};

const findNodeById = (node: any, id: any): any => {
  // Check if current node matches the id
  if (node.id === id) {
    return node;
  }

  // If the current node has children, look for the node recursively in its child array
  if (node.child) {
    for (let child of node.child) {
      const result = findNodeById(child, id);
      if (result) {
        return result;
      }
    }
  }

  // The node was not found, return null
  return null;
}

export const moveNode = (state: any, nodeIdToMove: IdType, targetParentId: IdType) => {
  let tree = state.data;
  let parentNode: any = null;
  let nodeToMove: any = null;
  let nodeIndex = -1;

  // Defines the function to traverse the tree and find the node's parent by its ID
  function findParentAndNode(currentNode: { child?: any[] } | null, parentId: IdType) {
    if (currentNode && currentNode.child) {
      for (let i = 0; i < currentNode.child.length; i++) {
        let child = currentNode.child[i];

        if (child.id === nodeIdToMove) {
          parentNode = currentNode;  // Set the parent node
          nodeToMove = child;        // Set the node to move
          nodeIndex = i;             // Set the index where the node was found
          return true;
        }

        // Recursive call to go deeper into the tree
        if (findParentAndNode(child, parentId)) {
          return true;
        }
      }
    }
    return false;
  }

  // Start the search for the parent and the node to be moved
  findParentAndNode(tree, targetParentId);

  // If we cannot find the node or the target parent, we cannot proceed with the move
  if (!nodeToMove || !findNodeById(tree, targetParentId)) {
    console.error('Cannot find node or target parent id');
    return null;
  }

  // Remove the node from its old parent's child array
  if (parentNode) {
    parentNode.child?.splice(nodeIndex, 1);
  }

  // Add the node to the new parent's child array
  const targetParent = findNodeById(tree, targetParentId);

  if (targetParent && !targetParent.child) {
    targetParent.child = []; // Ensure the target parent has a 'child' array if it did not before
  }

  if (targetParent && targetParent.child) {
    targetParent.child.push(nodeToMove);
  }

  state.data = tree;
  return state;
}