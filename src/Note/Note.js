import React from 'react';
import dummyStore from '../dummyStore';
import './Note.css'

export default function Note(props) {
    const note = dummyStore.notes.find(n => n.id === props.match.params.noteId);
    const noteFolder = dummyStore.folders.find(f => f.id === note.folderId);
    return (
        <div className='Note wrapper'>
            <div className='Note__nav'>
                <h3>{noteFolder.name}</h3>
                <button type='button' onClick={() => props.history.goBack()}>Back</button>
            </div>

            <div className='Note__content'>
                <h2>{note.name}</h2>
                <p>{note.content}</p>
                <button type='button'>Delete</button>
            </div>
        </div>
    )
}
