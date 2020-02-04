import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Main.css";

export default class Main extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static contextType = NotefulContext;

  handleDeleteNote = id => {
    const noteId = id;
    const url = "http://localhost:9090/notes/";
    console.log(noteId);
    fetch(url + `${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };
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
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  this.handleDeleteNote(note.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/* this doesn't have to work yet */}
        <button type="button">New note</button>
      </div>
    );
  }
}
