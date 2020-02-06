import React from "react";
import ValidationError from "../ValidationError/ValidationError";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: "",
        touched: false
      }
    };
  }

  updateFolderName(name) {
    this.setState({ folderName: { value: name, touched: true } });
  }

  validateFolderName() {
    const name = this.state.folderName.value.trim();
    if (name.length === 0) {
      return "You must give the folder a name";
    } else if (!name.match(/[a-zA-Z]/)) {
      return "Folder name must include at least one letter";
    }
  }

  handleSubmit = name => {
    const url = "http://localhost:9090/folders/";
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        this.context.addFolder(name);
      })
      .catch(error => {
        console.error({ error });
      });

    this.props.history.push("/");
  };
  render() {
    const nameError = this.validateFolderName();
    return (
      <form
        className="AddFolder"
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(this.state.folderName.value);
        }}
      >
        <label htmlFor="name">New Folder Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={e => this.updateFolderName(e.target.value)}
        />
        <button
          type="submit"
          className="AddFolder__btn"
          disabled={this.validateFolderName()}
        >
          Add
        </button>
        {this.state.folderName.touched && (
          <ValidationError message={nameError} />
        )}
      </form>
    );
  }
}
