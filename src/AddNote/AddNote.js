import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "../ValidationError/ValidationError";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: {
        value: "",
        touched: false
      },
      noteContent: {
        value: "",
        touched: false
      },
      folderId: "",
      folders: []
    };
  }

  static contextType = NotefulContext;

  updateNoteName(name) {
    this.setState({ noteName: { value: name } });
  }

  updateNoteContent(content) {
    this.setState({ noteContent: { value: content } });
  }

  updateFolderId(id) {
    this.setState({ folderId: id });
  }

  validateName() {
    const newNoteName = this.state.noteName.value.trim();
    if (newNoteName.length === 0) {
      return "You must give the note a name";
    }
  }

  validateContent() {
    const newNoteContent = this.state.noteContent.value;
    if (newNoteContent.length === 0) {
      return "The note must have content";
    }
  }

  //   need to add folderId, content to POST
  handleSubmit = () => {
    const name = this.state.noteName.value;
    const content = this.state.noteContent.value;
    const { folderId } = this.state;
    const url = "http://localhost:9090/notes/";
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, content, folderId })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
      })
      .catch(error => {
        console.error({ error });
      });

    this.props.history.push("/");
  };

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();
    return (
      <form
        className="AddNote"
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit();
        }}
      >
        <label htmlFor="name">New note name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={e => this.updateNoteName(e.target.value)}
        />
        <br />
        <label htmlFor="folder">Choose a folder:</label>
        <select
          name="folder"
          onChange={e => this.updateFolderId(e.target.value)}
        >
          <option>Select Folder...</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="content">Note content:</label>
        <input
          type="text"
          name="content"
          id="content"
          size="100"
          onChange={e => this.updateNoteContent(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="AddNote__btn"
          //   disabled={this.validateName() || this.validateContent()}
        >
          Add
        </button>
        {this.state.noteName.touched && this.state.noteContent.touched && (
          <ValidationError message={nameError} />
        )}
      </form>
    );
  }
}
