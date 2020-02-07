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
    this.setState({ noteName: { value: name, touched: true } });
  }

  updateNoteContent(content) {
    this.setState({ noteContent: { value: content, touched: true } });
  }

  updateFolderId(id) {
    this.setState({ folderId: id });
  }

  validateName() {
    const newNoteName = this.state.noteName.value.trim();
    if (newNoteName.length === 0) {
      return "You must give the note a name";
    } else if (!newNoteName.match(/[a-zA-Z]/)) {
      return "Note name must include at least one letter";
    }
  }

  validateContent() {
    const newNoteContent = this.state.noteContent.value;
    if (newNoteContent.length === 0) {
      return "The note must have content";
    } else if (!newNoteContent.match(/[a-zA-Z]/)) {
      return "Note content must include at least one letter";
    }
  }

  validateFolder() {
    const newNoteFolder = this.state.folderId;
    if (newNoteFolder === "") {
      return "You must select a folder for your note";
    }
  }

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
        this.props.handleStateChange(note);
      })
      .catch(error => {
        console.error({ error });
      });

    this.props.history.push("/");
  };

  componentDidUpdate(prevState) {
    if (prevState.notes !== this.state.notes) {
      console.log("the state changed");
    }
  }

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const folderError = this.validateFolder();
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
          required
        />
        {this.state.noteName.touched && <ValidationError message={nameError} />}
        <br />
        <label htmlFor="folder">Choose a folder:</label>
        <select
          name="folder"
          onChange={e => this.updateFolderId(e.target.value)}
          required
        >
          <option value="">Select Folder...</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        {this.state.folderId.touched && (
          <ValidationError message={folderError} />
        )}
        <br />
        <label htmlFor="content">Note content:</label>
        <input
          type="text"
          name="content"
          id="content"
          size="100"
          onChange={e => this.updateNoteContent(e.target.value)}
          required
        />
        {this.state.noteContent.touched && (
          <ValidationError message={contentError} />
        )}
        <br />
        <button
          type="submit"
          className="AddNote__btn"
          disabled={
            this.validateName() ||
            this.validateContent() ||
            this.validateFolder()
          }
        >
          Add
        </button>
      </form>
    );
  }
}
