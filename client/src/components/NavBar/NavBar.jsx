import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {

    return (
        <div className='navContainer'>
            <Link to='/home' className='logo'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9P5FQ52hLD9KM-RFncgcxiOOEUBdHow3YA&usqp=CAU" alt="logo pokeball" />
                <div className='navTitle'>
                    <h2>Pokedex</h2>
                </div>
            </Link>
            <Link to='/create' className='createLink'>
                <h2>Create a new Pokemon!</h2>
            </Link>
        </div>
    )
};