import React from 'react';
import dummyStore from '../dummyStore';

export default function Note(props) {
    const note = dummyStore.notes.find(n => n.id === props.match.params.noteId);
    const noteFolder = dummyStore.folders.find(f => f.id === note.folderId);
    return (
        <div className='Note'>
            <div>
                <h3>{noteFolder.name}</h3>
                <button type='button'>Go back</button>
            </div>

            <div>
            <h2>{note.name}</h2>
            <p>{note.content}</p>
            <button type='button'>Delete</button>
            </div>
        </div>
    )
}
