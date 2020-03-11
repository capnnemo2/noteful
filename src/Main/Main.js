import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import config from "../config";
import "./Main.css";

export default class Main extends React.Component {
  static contextType = NotefulContext;

  handleDelete = noteId => {
    fetch(config.API_ENDPOINT_NOTES + `/${noteId}`, {
      method: "DELETE",
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
      .then(data => {
        this.context.deleteNote(noteId);
        console.log(this.context.notes);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { notes = [] } = this.context;
    return (
      <div className="Main">
        <ul>
          {notes.map(note => (
            <li key={note.id} className="Main__li">
              <Link to={`/note/${note.id}`} className="Main__link">
                {note.note_name}
              </Link>
              <div className="Main__btn_container">
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    this.handleDelete(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          <li>
            <Link to={"/addNote"} className="Main__addNote">
              Add a Note
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
