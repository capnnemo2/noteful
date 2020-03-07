import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "../ValidationError/ValidationError";
import config from "../config";

export default class DeleteFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder_id: "",
      folders: []
    };
  }

  static contextType = NotefulContext;

  updateFolderId(folder_id) {
    this.setState({ folder_id });
  }

  validateFolder() {
    const folderToDelete = this.state.folder_id;
    if (folderToDelete === "") {
      return "You must choose a folder to delete";
    }
  }

  handleSubmit = () => {
    const folder_id = Number(this.state.folder_id);
    fetch(config.API_ENDPOINT_FOLDERS + `/${folder_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application.json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
      })
      .then(data => {
        this.context.deleteFolder(folder_id);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit();
        }}
      >
        <label htmlFor="folder">Choose a folder:</label>
        <select
          name="folder"
          onChange={e => this.updateFolderId(e.target.value)}
          required
        >
          <option value="">Select folder...</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.folder_name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="DeleteNote__btn"
          disabled={this.validateFolder()}
        >
          Delete
        </button>
      </form>
    );
  }
}
