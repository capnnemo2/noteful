import React from "react";
import NotefulContext from "../NotefulContext";
import config from "../config";

export default class EditFolder extends React.Component {
  static contextType = NotefulContext;

  state = {
    error: null,
    id: "",
    folder_name: ""
  };

  componentDidMount() {
    const folder_id = Number(this.props.match.params.folder_id);
    fetch(config.API_ENDPOINT_FOLDERS + `/${folder_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          id: resData.id,
          folder_name: resData.folder_name
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleChangeName = e => {
    this.setState({ folder_name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { folder_id } = this.props.match.params;
    const { folder_name } = this.state;
    const newFolderName = { folder_name };
    console.log(folder_id);
    console.log(newFolderName);
    fetch(config.API_ENDPOINT_FOLDERS + `/${folder_id}`, {
      method: "PATCH",
      body: JSON.stringify(newFolderName),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
      })
      .then(() => {
        this.resetFields(newFolderName);
        this.context.updateFolder(newFolderName);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = newFields => {
    this.setState({
      id: newFields.id || "",
      folder_name: newFields.folder_name || ""
    });
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { folder_name } = this.state;
    return (
      <section className="EditFolderForm">
        <h2>Edit Folder</h2>
        <form className="EditFolder__form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={folder_name}
            onChange={this.handleChangeName}
            required
          />
          <button type="submit" className="EditFolder__btn">
            Save
          </button>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </form>
      </section>
    );
  }
}
