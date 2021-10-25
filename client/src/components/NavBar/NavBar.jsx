import React from "react";
import { Link } from "react-router-dom";
import { pokemonLogo } from "../../helpers/index";
import "./NavBar.css";

export default function NavBar() {

    return (
        <div className='navbar'>
            <Link to='/home'>
                <img 
                src={pokemonLogo}
                alt='imagen'
                width='180px'/>
            </Link>
            <Link to='/create'>
                <button className='createLink'>Create new!</button>
            </Link>
        </div>
    )
};