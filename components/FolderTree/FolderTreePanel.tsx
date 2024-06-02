"use client";
import { useTraverseTree } from "@/utils/traverseTree";
import FolderTree from "@/components/FolderTree/FolderTree";
import { folderTree } from "@/utils/data";
import { useState } from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FileType } from "@/types/interfaces";

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{ width: 14, height: 14 }}
            {...props}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}
const FolderTreePanel = ({ explorerData, handleOnOpenFolder }: { explorerData: any; handleOnOpenFolder: (folder: FileType, index: number)=>void; }) => {

    const { insertNode } = useTraverseTree();

    const handleFolderFileCreation = (folderID: any, item: any, isFolder: any) => {
        console.log("Insert Node!");

        // const finalTree = insertNode(explorerData, folderID, item, isFolder);

        // setExplorerData(finalTree);
    }

    return (
        <Box sx={{ height: 220, flexGrow: 1, maxWidth: 400 }}>
            <SimpleTreeView
                defaultExpandedItems={['grid']}
                slots={{
                    expandIcon: AddBoxIcon,
                    collapseIcon: IndeterminateCheckBoxIcon,
                    endIcon: CloseSquare,
                }}
            >
                {explorerData.map((folder: any, idx: number) => (
                    <FolderTree
                        key={folder.id}
                        index={idx}
                        folder={folder}
                        handleOnOpenFolder={handleOnOpenFolder}
                        handleFolderFileCreation={handleFolderFileCreation}
                    />
                ))}
            </SimpleTreeView>
        </Box>
    );
}

export default FolderTreePanel;