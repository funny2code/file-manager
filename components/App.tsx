"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import "./App.css";

import Navbar from "@/components/Navbar/Navbar";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { selectFolders } from "@/redux/reducers/folderReducer";
import { fetchFolderRoot } from "@/redux/actions/folderAction";
import FileList from "@/components/FileList/FileList";
import BreadCrumbText from "@/components/BreadCrumb/BreadCrumbText";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import { FileType } from "@/types/interfaces";
import FolderTreePanel from "./FolderTree/FolderTreePanel";

const theme = createTheme({
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

  // if (folderData?.subFolder && folderData?.subFolder.length) {
  if (folderData?.subFolder && folderData?.subFolder.length) {
    filteredSubFolderData = folderData.subFolder.filter((file: FileType) =>
      file.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <ContextMenu>
      <ThemeProvider theme={theme}>
        {/* <Navbar handleOnSearch={handleOnSearch} /> */}
        <BreadCrumbText />

        {folderData && folderData?.isLoading ? (
          <div>Loading... </div>
        ) : (
          <div className="grid grid-cols-10 gap-3">
            <div className="col-span-2">
              <FolderTreePanel />
            </div>
            <div className="col-span-8">
              <FileList fileList={filteredSubFolderData} />
            </div>
          </div>
        )}
      </ThemeProvider>
    </ContextMenu>
  );
};

export default App;
