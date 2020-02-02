import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Main.css";

export default class Main extends React.Component {
  static contextType = NotefulContext;
  render() {
    const { notes = [] } = this.context;
    return (
      <div className="Main">
        <ul>
          {notes.map(note => (
            <li key={note.id} className="Main__li">
              <Link to={`/note/${note.id}`} className="Main__link">
                {note.name}
              </Link>
              <button type="button">Delete</button>
            </li>
          ))}
        </ul>
        {/* this doesn't have to work yet */}
        <button type="button">New note</button>
      </div>
    );
  }
}
