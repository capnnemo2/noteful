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
      folders: []
    };
  }

  static contextType = NotefulContext;

  updateNoteName(name) {
    this.setState({ noteName: { value: name } });
  }

  validateName() {
    const newNoteName = this.state.noteName.value.trim();
    if (newNoteName.length === 0) {
      return "You must give the note a name";
    }
  }

  handleSubmit = name => {
    console.log(name);
  };

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();
    return (
      <form
        className="AddNote"
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(this.state.noteName.value);
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
        <select name="folder">
          {folders.map(folder => (
            <option key={folder.id}>{folder.name}</option>
          ))}
        </select>
        <br />
        <button
          type="submit"
          className="AddNote__btn"
          disabled={this.validateName()}
        >
          Add
        </button>
        {this.state.noteName.touched && <ValidationError message={nameError} />}
      </form>
    );
  }
}
