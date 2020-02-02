import React from "react";
import { NavLink } from "react-router-dom";
import dummyStore from "../dummyStore";
import "./FolderNav.css";

export default class FolderNav extends React.Component {
  render() {
    return (
      <div className="FolderNav">
        <ul>
          {dummyStore.folders.map(folder => (
            <li key={folder.id}>
              <NavLink to={`/folder/${folder.id}`} className="FolderNav__link">
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* this button should actually link to another component that we're not required to build yet*/}
        <button type="button">Add folder</button>
      </div>
    );
  }
}
