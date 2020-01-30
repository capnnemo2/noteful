import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './Main/Main';
import FolderNav from './FolderNav/FolderNav';
import Header from './Header/Header';
import Folder from './Folder/Folder';
import Note from './Note/Note';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import './App.css'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <div className='wrapper'>
          <nav>
            {/* Render a component when the path is / or /folder */}
            <Route exact path='/' component={FolderNav} />
            <Route path='/folder/:folderId' component={FolderNav} />
          </nav>
          <main>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route path='/folder/:folderId' component={Folder} />
              <Route path='/note/:noteId' component={Note} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
        
      </div>
    );
  }
  
}


