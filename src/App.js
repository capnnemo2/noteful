import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main/Main";
import FolderNav from "./FolderNav/FolderNav";
import Header from "./Header/Header";
import Folder from "./Folder/Folder";
import Note from "./Note/Note";
import NotFound from "./NotFound/NotFound";
import "./App.css";

export default class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    const url = "http://localhost:9090/";
    fetch(url + "folders")
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(folders => {
        this.setState({
          folders
        });
      })
      .catch(error => {
        console.log({ error });
      });
  }

  render() {
    return (
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
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}
