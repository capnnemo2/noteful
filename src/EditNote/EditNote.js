import React from "react";
import NotefulContext from "../NotefulContext";
import config from "../config";

export default class EditNote extends React.Component {
  static contextType = NotefulContext;

  state = {
    error: null
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { note_id } = this.props.match.params;
    const note_name = e.target.note_name.value;
    const folder_id = e.target.folder_id.value;
    const content = e.target.content.value;
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
        this.context.updateNote(newNote, note_id);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };

  render() {
    const note_id = Number(this.props.match.params.note_id);
    const note = this.context.notes.find(n => n.id === note_id);
    return note ? (
      <section className="EditNoteForm">
        <h2>Edit Note</h2>
        <form className="EditNote__form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Note name</label>
            <input
              type="text"
              name="note_name"
              id="name"
              defaultValue={note.note_name}
              required
            />
          </div>
          <div>
            <label htmlFor="folder">Folder:</label>
            <select name="folder_id" required>
              {this.context.folders.map(folder =>
                folder.id === note.folder_id ? (
                  <option
                    key={folder.id}
                    value={folder.id}
                    defaultValue={folder.folder_name}
                  >
                    {folder.folder_name}
                  </option>
                ) : (
                  <option key={folder.id} value={folder.id}>
                    {folder.folder_name}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              name="content"
              id="content"
              size="100"
              defaultValue={note.content}
              required
            />
          </div>
          <div className="EditNote__buttons">
            <button type="submit">Save Changes</button>
            <button type="reset" onClick={this.handleClickCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    ) : (
      ""
    );
  }
}
