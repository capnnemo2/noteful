import React from "react";

export default React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  updateFolder: () => {},
  deleteFolder: () => {},
  deleteFolderNotes: () => {},
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {}
});
