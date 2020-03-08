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
    folders: []
  };

  componentDidMount() {
    const { note_id } = this.props.match.params;
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
  }

  render() {
    const { note_name, folder_id, content } = this.state;
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
              {/* this first option should display the folder the note is already in */}
              <option value={folder_id}>{folder_id.folder_name}</option>
              {folder_id.localeCompare(folder => (
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
        </form>
      </section>
    );
  }
}
