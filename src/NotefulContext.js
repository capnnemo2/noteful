import React from "react";

export default React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  updateFolder: () => {},
  deleteFolder: () => {},
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {}
});
