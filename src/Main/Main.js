import React from 'react';
import {Link} from 'react-router-dom';
import dummyStore from '../dummyStore';
import './Main.css';

export default class Main extends React.Component {
    render() {
        return (
            <div className='Main'>
                <ul>
                    {dummyStore.notes.map(note =>
                        <li key={note.id} className='Main__link'>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <button type='button'>Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}