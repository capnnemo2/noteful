import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Folder.css";

export default class Folder extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { folders = [] } = this.context;
    const folder = folders.find(
      f => f.id === Number(this.props.match.params.folder_id)
    );

    const { notes = [] } = this.context;
    const notesInFolder = notes.filter(
      n => n.folder_id === Number(this.props.match.params.folder_id)
    );

    return folder ? (
      <div className="Folder">
        <h2>{folder.folder_name}</h2>
        <Link to={`/editFolder/${this.props.match.params.folder_id}`}>
          Edit Folder
        </Link>
        <ul>
          {notesInFolder.map(note => (
            <li key={note.id} className="Folder__note_link">
              <Link to={`/note/${note.id}`} className="Folder__link">
                {note.note_name}
              </Link>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  this.context.deleteNote(note.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
          <li>
            <Link to={"/addNote"} className="Main__addNote">
              Add a Note
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      "Loading Folder & Notes..."
    );
  }
}
