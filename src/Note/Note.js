import React from "react";
import NotefulContext from "../NotefulContext";
import "./Note.css";

export default class Note extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };

  findNote = (notes = [], noteId) => notes.find(note => note.id === noteId);

  static contextType = NotefulContext;
  render() {
    // const { notes = [] } = this.context;
    // const { folders = [] } = this.context;
    const { notes, folders } = this.context;
    // const { noteId } = this.props.match.params;
    // const { folderId } = this.props.match.params;
    const { noteId, folderId } = this.props.match.params;
    const note = notes.find(note => note.id === noteId);
    const noteFolder = folders.find(f => f.id === folderId);
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
          <button type="button">Delete</button>
        </div>
      </div>
    );
  }
}
