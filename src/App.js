import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main/Main";
import FolderNav from "./FolderNav/FolderNav";
import Header from "./Header/Header";
import Folder from "./Folder/Folder";
import Note from "./Note/Note";
import NotFound from "./NotFound/NotFound";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import NotefulContext from "./NotefulContext";
import config from "./config";
import "./App.css";
import DeleteFolder from "./DeleteFolder/DeleteFolder";

export default class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    });
  };

  setNotes = notes => {
    this.setState({
      notes,
      error: null
    });
  };

  addFolder = folder => {
    this.setState({ folders: [...this.state.folders, folder] });
  };

  addNote = note => {
    this.setState({ notes: [...this.state.notes, note] });
  };

  // updateFolder = newFolder => {
  //   let folders = this.state.folders.map(f =>
  //     f.id === newFolder.id ? newFolder : f
  //   );
  //   this.setState({ folders });
  // };

  // updateNote = newNote => {
  //   let notes = this.state.notes.map(n => (n.id === newNote.id ? newNote : n));
  //   this.setState({ notes });
  // };

  deleteFolder = folderId => {
    const newFolders = this.state.folders.filter(
      f => Number(f.id) !== Number(folderId)
    );
    this.setState({ folders: newFolders });
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(
      n => Number(n.id) !== Number(noteId)
    );
    this.setState({ notes: newNotes });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT_FOLDERS, {
      method: "GET",
      headers: {
        "content-type": "application/json"
        // Authorization: `${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }));

    fetch(config.API_ENDPOINT_NOTES, {
      method: "GET",
      headers: {
        "content-type": "application/json"
        // Authorization: `${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }));
  }

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      updateFolder: this.updateFolder,
      deleteFolder: this.deleteFolder,
      addNote: this.addNote,
      updateNote: this.updateNote,
      deleteNote: this.deleteNote
    };

    return (
      <NotefulContext.Provider value={value}>
        <div className="App">
          <header>
            <Header />
          </header>
          <div className="wrapper">
            <nav>
              <Route exact path="/" component={FolderNav} />
              <Route path="/folder/:folderId" component={FolderNav} />
            </nav>
            <main>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/folder/:folder_id" component={Folder} />
                <Route path="/note/:note_id" component={Note} />
                <Route path="/addFolder" component={AddFolder} />
                <Route path="/addNote" component={AddNote} />
                <Route path="/deleteFolder" component={DeleteFolder} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}
