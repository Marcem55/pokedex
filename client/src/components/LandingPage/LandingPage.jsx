import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage () {

    return (
        <div className='landingContainer'>
            <h1 className='landingTitle'>Welcome to Pokedex App!</h1>
            <Link to='/home'>
                <button className='landingBtn'>ENTER</button>
            </Link>
        </div>
    )
};