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
    let fetchNotes = fetch(config.API_ENDPOINT_NOTES + `/${note_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });

    let fetchFolder = fetch(config.API_ENDPOINT_FOLDERS, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });

    Promise.all([fetchNotes, fetchFolder]).then(result => {
      Promise.all(result.map(res => res.json()))
        .then(res => {
          this.displayFolderName(res[1], res[0].folder_id);
          this.setState({
            id: res[0].id,
            note_name: res[0].note_name,
            folder_id: res[0].folder_id,
            content: res[0].content,
            folders: res[1]
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    });
  }

  displayFolderName = (folders, folder_id) => {
    const folderName = folders.find(
      f => f.id.toString() === folder_id.toString()
    );
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

  handleSubmit = e => {
    e.preventDefault();
    const { note_id } = this.props.match.params;
    const { note_name, folder_id, content } = this.state;
    const newNote = { note_name, folder_id, content };
    console.log(newNote);
    console.log(note_id);
    fetch(config.API_ENDPOINT_NOTES + `/${note_id}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
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
        this.resetFields(newNote);
        this.context.updateNote(newNote);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = newFields => {
    this.setState({
      note_name: newFields.note_name || "",
      folder_id: newFields.note_name || "",
      content: newFields.content || ""
    });
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
              {/* this first option is not able to set state for some reason? */}
              <option value={folder_id}>
                {this.state.folder_name}(If you decide to change this, do not
                change back to this exact choice)
              </option>
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
