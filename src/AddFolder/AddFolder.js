import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "../ValidationError/ValidationError";
import config from "../config";

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

  static contextType = NotefulContext;

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

  handleSubmit = () => {
    const folder_name = this.state.folderName.value;
    fetch(config.API_ENDPOINT_FOLDERS, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ folder_name })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        this.context.addFolder(data);
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
          this.handleSubmit();
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
