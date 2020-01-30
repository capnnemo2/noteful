import React from 'react';
import dummyStore from '../dummyStore';

export default class Folder extends React.Component {

    render() {

        const folder = dummyStore.folders.find(f => f.id === this.props.match.params.folderId)

        return (
            <div className='Folder'>
                <h2>{folder.name}</h2>
            </div>
        )
    }
}
