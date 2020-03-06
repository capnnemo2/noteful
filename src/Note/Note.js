import React from "react";
import NotefulContext from "../NotefulContext";
import "./Note.css";

export default class Note extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { notes = [], folders = [] } = this.context;
    console.log(notes);
    const noteId = this.props.match.params.note_id;
    console.log(`note id: ${noteId}`);

    const note = notes.find(n => n.id === noteId);
    console.log(note);
    const noteFolder = note ? folders.find(f => f.id === note.folderId) : {};
    return note ? (
      <div className="Note wrapper">
        <div className="Note__nav">
          <h3>{noteFolder.folder_name}</h3>
          <button type="button" onClick={() => this.props.history.goBack()}>
            Back
          </button>
        </div>

        <div className="Note__content">
          <h2>{note.name}</h2>
          <p>{note.content}</p>
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              this.context.deleteNote(noteId, () =>
                this.props.history.push("/")
              );
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ) : (
      "Loading Note..."
    );
  }
}
