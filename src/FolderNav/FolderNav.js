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
              <NavLink to={`/folder/${folder.id}`} className="FolderNav__link">
                {folder.name}
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
        </ul>
      </div>
    );
  }
}
