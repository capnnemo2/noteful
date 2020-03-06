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
import "./App.css";

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

  handleDeleteNote = (id, cb) => {
    const noteId = id;
    const url = "http://localhost:9090/notes/";
    fetch(url + `${noteId}`, {
      method: "DELETE",
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
      .then(() => {
        this.setState(
          {
            notes: this.state.notes.filter(note => note.id !== noteId)
          },
          cb
        );
      })
      .catch(error => {
        console.error({ error });
      });
  };

  addNote = note => {
    this.setState({ notes: [...this.state.notes, note] });
  };

  addFolder = folder => {
    this.setState({ folders: [...this.state.folders, folder] });
  };

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder
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
                <Route path="/folder/:folderId" component={Folder} />
                <Route path="/note/:noteId" component={Note} />
                <Route path="/addFolder" component={AddFolder} />
                <Route path="/addNote" component={AddNote} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}
