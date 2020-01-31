import React from 'react';
import {Link} from 'react-router-dom';
import dummyStore from '../dummyStore';
import './Folder.css';

export default class Folder extends React.Component {

    render() {

        const folder = dummyStore.folders.find(f => f.id === this.props.match.params.folderId);

        const notes = dummyStore.notes.filter(n => n.folderId === this.props.match.params.folderId);

        return (
            <div className='Folder'>
                <h2>{folder.name}</h2>

                <ul>
                    {notes.map(note =>
                        <li key={note.id} className=''>
                            <Link to={`/note/${note.id}`} className='Folder__link'>
                                {note.name}
                            </Link>
                            <button type='button'>Delete</button>
                        </li>
                    )}
                </ul>
                <button type='button'>New note</button>
            </div>
        )
    }
}
