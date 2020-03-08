import React from "react";
import NotefulContext from "../NotefulContext";
import config from "../config";

export default class EditNote extends React.Component {
  static contextType = NotefulContext;

  state = {
    error: null,
    id: "",
    note_name: "",
    folder_id: "",
    content: "",
    folder_name: "",
    folders: []
  };

  componentDidMount() {
    const note_id = Number(this.props.match.params.note_id);
    fetch(config.API_ENDPOINT_NOTES + `/${note_id}`, {
      method: "GET",
      headers: {
        //   do i need this header?
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          id: resData.id,
          note_name: resData.note_name,
          folder_id: resData.folder_id,
          content: resData.content
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });

    fetch(config.API_ENDPOINT_FOLDERS, {
      method: "GET",
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
      .then(resData => {
        this.setState({
          folders: resData
        });
        new Promise(this.displayFolderName);
      })
      //   .then(this.displayFolderName)
      .catch(error => {
        this.setState({ error });
      });
  }

  displayFolderName = () => {
    const folderName = this.state.folders.find(
      f => f.id === this.state.folder_id
    );
    console.log(folderName.folder_name);
    this.setState({
      folder_name: folderName.folder_name
    });
  };

  handleChangeName = e => {
    this.setState({ note_name: e.target.value });
  };

  handleChangeFolder = e => {
    this.setState({ folder_id: e.target.value });
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { note_name, folder_id, content } = this.state;
    const { folders = [] } = this.state;
    return (
      <section className="EditNoteForm">
        <h2>Edit Note</h2>
        <form className="EditNote__form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Note name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={note_name}
              onChange={this.handleChangeName}
              required
            />
          </div>
          <div>
            <label htmlFor="folder">Folder:</label>
            <select name="folder" onChange={this.handleChangeFolder} required>
              <option value={folder_id}>{this.state.folder_name}</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.folder_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              name="content"
              id="content"
              size="100"
              value={content}
              onChange={this.handleChangeContent}
              required
            />
          </div>
          <div className="EditNote__buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  }
}