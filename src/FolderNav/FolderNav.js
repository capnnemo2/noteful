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
        </ul>
        {/* this doesn't have to work yet*/}
        <button type="button">Add folder</button>
      </div>
    );
  }
}
