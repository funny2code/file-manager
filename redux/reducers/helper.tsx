import { FileType, IdType } from "@/types/interfaces";
import { deleteNode, insertNode, updatePathTree } from "../../utils/traverseTree";
import { current } from "@reduxjs/toolkit";

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
const findNodeById = (node: FileType, id: IdType) : FileType | null => {
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
const deleteANode = (tree: FileType, id: IdType) : FileType => {
  for (let i = 0; i < tree?.child?.length; i++) {
    const item: FileType = tree.child[i];
    if (item.id === id) {
      tree.child.splice(i, 1);
      return tree;
    } else {
      deleteANode(item, id);
    }
  }
  return tree;
};
const insertANode = (tree: FileType, parentId:IdType, newFolder: FileType): {} => {
  if (tree.id == parentId) {
    newFolder.parentId = parentId;
    return { ...tree, child: [...tree.child, newFolder] };
  }

  const latestNode = tree?.child?.map((item) => {
    return insertANode(item, parentId, newFolder);
  });

  return { ...tree, child: latestNode };
};
const writePath2Target = (tree: FileType, targetId: IdType, path: any[], pathTree: FileType[][]) : boolean => {
  if (tree.id == targetId) {
      path.push({id: tree.id, name: tree.name});
      pathTree.push(tree?.child);
      // id: file.id, name: file.name, index: file.index
      return true;
  }
  if (tree.child) {
      for (let i = 0; i < tree.child.length; i++) {
          const res = writePath2Target(tree.child[i], targetId, path, pathTree);
          if (res) {
              if (tree.name != 'root')
              {
                path.push({id: tree.id, name: tree.name});
                pathTree.push(tree.child)
              }
              return true;
          }
      }
  }
  return false;
}
export const moveNode = (state: any, nodeIdToMove: IdType, targetParentId: IdType) => {
  let treeData = state.data;
  let subFolder = state.subFolder;
  
  let sourceNode = findNodeById(treeData, nodeIdToMove);
  if (sourceNode) {
    treeData = deleteANode(treeData, nodeIdToMove);
    treeData = insertANode(treeData, targetParentId, sourceNode);
    // let updatedSubFolder = subFolder.filter((item: FileType) => item.id!=nodeIdToMove);
    let updatedParent = findNodeById(treeData, subFolder[0].parentId);
    let updatedSubFolder = updatedParent?.child;
    
    state.data = treeData;
    state.subFolder = updatedSubFolder;
    
    return state;
  } else {
    return state;
  }
}


export const updateSubFolder = (state: any, openedFolder: FileType) => {
  let treeData = state.data;
  let subFolder = state.subFolder;
  let updatedPath: IdType[] = [];
  let updatedPathTree: FileType[][] = [];
  writePath2Target(treeData, openedFolder.id, updatedPath, updatedPathTree);
  state.subFolder = openedFolder.child;
  state.path = updatedPath.reverse();
  state.pathTree = updatedPathTree.reverse();
  console.log("Updated Path: ", current(state), current(treeData))
  return state;
}