import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <div className='navbar'>
            <Link to='/home'>
                <h4>Home</h4>
            </Link>
            <Link to='/createPokemon'>
                <h4>Create Pokemon</h4>
            </Link>
        </div>
    )
};