"use client";

import { FC, ReactElement, useEffect, useState } from "react";
/* import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors"; */

import "./App.css";

// import Navbar from "@/components/Navbar/Navbar";

// redux stuff
import { selectFolders } from "@/redux/reducers/folderReducer";
import { fetchFolderRoot } from "@/redux/actions/folderAction";
import FileList from "@/components/FileList/FileList";
import BreadCrumbText from "@/components/BreadCrumb/BreadCrumbText";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import { FileType } from "@/types/interfaces";
import FolderTreePanel from "./FolderTree/FolderTreePanel";
import { useDispatch, useSelector } from "react-redux";
import {
    addFileToActiveStatus,
    addFileToStage,
    updateFolderName,
    updateSubFolder,
    moveNode,
} from "@/redux/actions/folderAction";

/* const theme = createTheme({
  palette: {
    primary: {
      main: "#746de4",
      // main: "#6d97e4",
    },
    secondary: {
      main: green[500],
    },
  },
});
 */
const App: FC = (): ReactElement => {
  const [searchValue, setSearchValue] = useState("");

  const folderData = useSelector(selectFolders);
  const dispatch = useDispatch();

  let filteredSubFolderData = [];

  useEffect(() => {
    dispatch(fetchFolderRoot());
  }, [dispatch]);

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  if (folderData?.subFolder && folderData?.subFolder.length) {
    console.log("folderData.data: ", folderData.data);
    filteredSubFolderData = folderData.subFolder.filter((file: FileType) =>
      file.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  const handleOnOpenFolder = (folder: FileType, index: number) => {
    if (folder.isFolder) {
      dispatch(updateSubFolder({ ...folder, index }));
    }
  };

  return (
    <ContextMenu>
        {/* <Navbar handleOnSearch={handleOnSearch} /> */}

        {folderData && folderData?.isLoading ? (
          <div>Loading... </div>
        ) : (
          <div className="grid grid-cols-10 gap-3">
            <div className="col-span-2">
              <FolderTreePanel explorerData={folderData.data.child} handleOnOpenFolder={handleOnOpenFolder} />
            </div>
            <div className="col-span-8">
              <BreadCrumbText />
              <FileList fileList={filteredSubFolderData} handleOnOpenFolder={handleOnOpenFolder} />
            </div>
          </div>
        )}
    </ContextMenu>
  );
};

export default App;
