import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Folder.css";

export default class Folder extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static contextType = NotefulContext;

  render() {
    const { folders = [] } = this.context;
    const folder = folders.find(f => f.id === this.props.match.params.folderId);

    const { notes = [] } = this.context;
    const notesInFolder = notes.filter(
      n => n.folderId === this.props.match.params.folderId
    );
    return folder ? (
      <div className="Folder">
        <h2>{folder.name}</h2>

        <ul>
          {notesInFolder.map(note => (
            <li key={note.id} className="Folder__note_link">
              <Link to={`/note/${note.id}`} className="Folder__link">
                {note.name}
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
              Add Note
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      "Loading Folder & Notes..."
    );
  }
}
