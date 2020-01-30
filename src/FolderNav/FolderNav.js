import React from 'react';
import {Link} from 'react-router-dom';
import dummyStore from '../dummyStore';
import './FolderNav.css';

export default class FolderNav extends React.Component {
    render() {
        return (
            <div className='FolderNav'>
                <ul>
                    {dummyStore.folders.map(folder => 
                        <li key={folder.id}>
                            <Link to={`/folder/${folder.id}`} className='FolderNav__link'>
                                {folder.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}