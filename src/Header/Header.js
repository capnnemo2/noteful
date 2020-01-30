import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className='Header'>
                <Link to='/' className='Header__link'>
                    <h1>Noteful</h1>
                </Link>
                <hr />
                
            </div>
        )
    }
}