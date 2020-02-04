import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Folder.css";

export default class Folder extends React.Component {
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
    const { folders = {} } = this.context;
    const folder = folders.find(f => f.id === this.props.match.params.folderId);

    const { notes = {} } = this.context;
    const notesInFolder = notes.filter(
      n => n.folderId === this.props.match.params.folderId
    );
    return (
      <div className="Folder">
        <h2>{folder.name}</h2>

        <ul>
          {notesInFolder.map(note => (
            <li key={note.id} className="">
              <Link to={`/note/${note.id}`} className="Folder__link">
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
        <button type="button">New note</button>
      </div>
    );
  }
}
