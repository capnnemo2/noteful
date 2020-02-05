import React from "react";
import NotefulContext from "../NotefulContext";
import "./Note.css";

export default class Note extends React.Component {
  // I don't know if I need the default props or not
  //   static defaultProps = {
  //     history: {
  //       goBack: () => {}
  //     },
  //     match: {
  //       params: {}
  //     }
  //   };

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
    const { notes = [], folders = [] } = this.context;
    const { noteId } = this.props.match.params;

    const note = notes.find(note => note.id === noteId);
    const noteFolder = folders.find(f => f.id === note.folderId);
    return (
      <div className="Note wrapper">
        <div className="Note__nav">
          <h3>{noteFolder.name}</h3>
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
              this.handleDeleteNote(noteId);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
