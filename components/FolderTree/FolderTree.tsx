import React, { useState } from 'react';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { CustomTreeItem, CustomeTreeView } from "@/components/FileList/CustomeTreeView";
import { FileType } from '@/types/interfaces';
import { FolderTwoTone, FolderOpenTwoTone } from '@mui/icons-material';

const FolderTree = ({ folder, handleFolderFileCreation, index, handleOnOpenFolder }: { 
    handleFolderFileCreation: (id: string, name: string, isFolder: boolean) => void;
    folder: FileType;
    index: number;
    handleOnOpenFolder: (folder: FileType, index: number)=>void;
}) => {
    const [isExpand, setIsExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false,
    });


    const handelClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, isFolder: boolean) => {
        e.stopPropagation();

        setIsExpand(pre=>!pre);
        console.log("clicked ---", folder, index);
        /* setShowInput({
            visible: true,
            isFolder: isFolder,
        }) */
        handleOnOpenFolder(folder, index);
    }

    /* const onCreateFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {

        // enter key event...
        if (e.key === "Enter" && e.currentTarget.value) {

            handleFolderFileCreation(explorerData.id, e.currentTarget.value, showInput.isFolder);

            setShowInput(pre => ({ ...pre, visible: false }))
        }
    } */

    if (folder.isFolder) {
       return (
            <CustomTreeItem 
                itemId={folder.id as string} 
                label={folder.name} 
                labelIcon={isExpand ? FolderOpenTwoTone: FolderTwoTone}
                onClick={(event) => handelClick(event, folder.isFolder)} 
            >
                {
                    folder.child?.map((folder:any, idx:number) => (
                        <FolderTree
                            key={folder.id}
                            index={idx}
                            folder={folder}
                            handleOnOpenFolder={handleOnOpenFolder}
                            handleFolderFileCreation={handleFolderFileCreation}
                        />
                    ))
                }
            </CustomTreeItem>
       )
    }
};

export default FolderTree;