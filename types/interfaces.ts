export interface IFolder {
  folder: {
    _id: string;
    name: string;
    ancestor: string;
    child: object[];
    designation: string;
  };
}

export type IdType = string | number;
export interface IParentFolder {
  parentFolder: {
    _id: string;
    name: string;
    ancestor: string;
    child: object[];
    designation: string;
  };
}

export type PathType = {
  id: IdType;
  name: string;
  index: number;
};

export interface IFolderSelector {
  data: [];
  isLoading: boolean;
}

export type FileType = {
  id: IdType;
  name: string;
  isFolder: boolean;
  parentId: string | number;
  color: string;
  child: [];
  index?: number | string;
};

export interface IState {
  data: FileType;
  subFolder: [];
  path: [];
  pathTree: [];
  isLoading: boolean;
  stagedFile: { stageType: "copy" | "cut"; file: FileType };
  activeFolder: { id: string | number; editable: boolean };
}

export type FileComProps = {
  file: FileType; index: number;
  sourceId: IdType | null;
  targetId: IdType | null;
  setSourceId: React.Dispatch<React.SetStateAction<IdType | null>>;
  setTargetId: React.Dispatch<React.SetStateAction<IdType | null>>;
}

export type StagedFileType = { stageType: "copy" | 'cut', file: FileType }
