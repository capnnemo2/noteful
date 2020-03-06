import React from "react";
import NotefulContext from "../NotefulContext";
import "./Note.css";

export default class Note extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { notes = [], folders = [] } = this.context;
    const noteId = this.props.match.params.note_id;

    const note = notes.find(note => note.id === Number(noteId));
    const noteFolder = note
      ? folders.find(f => f.id === Number(note.folder_id))
      : {};

    return note ? (
      <div className="Note wrapper">
        <div className="Note__nav">
          <h3>{noteFolder.folder_name}</h3>
          <button type="button" onClick={() => this.props.history.goBack()}>
            Back
          </button>
        </div>

        <div className="Note__content">
          <h2>{note.note_name}</h2>
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
