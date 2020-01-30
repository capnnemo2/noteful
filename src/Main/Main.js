import React from 'react';
import {Link} from 'react-router-dom';
import dummyStore from '../dummyStore';

export default class Main extends React.Component {
    render() {
        return (
            <div className='Main'>
                <ul>
                    {dummyStore.notes.map(note =>
                        <li key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}