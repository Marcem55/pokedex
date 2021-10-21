import React from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons } from '../../actions';
import './NavBar.css';

export const NavBar = () => {
    const dispatch = useDispatch();
    return (
        <header className='navBar'>
            <div className='return'>
                <Link to={'/landing'}><p>Go to Landing</p></Link>
            </div>
            <div>
                <Link to={'/home'}>
                    <button className='homeButton' onClick={() =>dispatch(getPokemons())}>
                    <p>Pokehome</p>
                    </button>
                </Link>
            </div>
            <div>
                <button className='createBtn'>
                    <p>Createmon</p>
                </button>
            </div>
        </header>
    )
}