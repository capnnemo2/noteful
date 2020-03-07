import React from "react";
import { NavLink } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./FolderNav.css";

export default class FolderNav extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { folders = [] } = this.context;
    return (
      <div className="FolderNav">
        <ul>
          {folders.map(folder => (
            <li key={folder.id}>
              <NavLink
                to={`/folder/${folder.id}`}
                className="FolderNav__link"
                key={folder.id}
              >
                {folder.folder_name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to={"/addFolder"}
              className="FolderNav__link FolderNav__addFolder"
            >
              Add Folder
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/deleteFolder"}
              className="FolderNav__link FolderNav__deleteFolder"
            >
              Delete a Folder
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
