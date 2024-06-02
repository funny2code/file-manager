"use client";
import File from "../File/File";
import { useState } from "react";
import FileListEmptyMessage from "./FileListEmptyMessage";
import "./FileList.css";
import { FileType, IdType } from "@/types/interfaces";

const FileList = ({ fileList = [], handleOnOpenFolder }: { fileList: FileType[]; handleOnOpenFolder: (folder: FileType, index: number)=>void; }) => {
  const [sourceId, setSourceId] = useState<IdType | null>(null);
  const [targetId, setTargetId] = useState<IdType | null>(null);
  const fileListComponent = fileList.map((file, idx) => {
    return <File file={file} handleOnOpenFolder={handleOnOpenFolder} key={file.id} index={idx} sourceId={sourceId} setSourceId={setSourceId} targetId={targetId} setTargetId={setTargetId} />;
  });

  return (
    <>
      {fileListComponent.length ? (
        <div className="files-panel"> {fileListComponent} </div>
      ) : (
        <FileListEmptyMessage />
      )}
    </>
  );
};

export default FileList;
