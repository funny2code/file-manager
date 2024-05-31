import React, { useState } from 'react';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled } from "@mui/material/styles";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CustomTreeItem = styled(TreeItem)({
    ["& .${treeItemClasses.iconContainer}"]: {
        "& .close": {
            opacity: 0.3
        }
    }
});

const FolderTree = ({ explorerData, handleFolderFileCreation }: { explorerData: { id: string; name: string; isFolder: boolean; items: { id: string; name: string; isFolder: boolean; items?: any[] }[] }, handleFolderFileCreation: (id: string, name: string, isFolder: boolean) => void }) => {

    const [isExpand, setIsExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false,
    });


    const handelClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, isFolder: boolean) => {
        e.stopPropagation();

        setIsExpand(isFolder);
        setShowInput({
            visible: true,
            isFolder: isFolder,
        })
    }

    const onCreateFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {

        // enter key event...
        if (e.keyCode === 13 && e.target.value) {

            handleFolderFileCreation(explorerData.id, e.target.value, showInput.isFolder);

            setShowInput(pre => ({ ...pre, visible: false }))
        }
    }


    if (explorerData.isFolder) {
       return (
        <TreeItem itemId={explorerData.id} label={explorerData.name} onClick={() => setIsExpand(pre =>!pre)}>
            {
                explorerData.child.map((item) => (
                    <FolderTree
                        key={item.id}
                        explorerData={item}
                        handleFolderFileCreation={handleFolderFileCreation}
                    />
                ))
            }
        </TreeItem>
       )
    }
};

export default FolderTree;