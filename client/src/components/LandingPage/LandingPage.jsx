import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className='Landing'>
            <div className='Container'>
                <div className='Title'>
                    <div className='eachWord'>
                        <h1 className='landingTitle'>G</h1>
                        <h1 className='landingTitle'>O</h1>
                        <h1 className='landingTitle'>T</h1>
                        <h1 className='landingTitle'>T</h1>
                        <h1 className='landingTitle'>A</h1>
                    </div>
                    <div className='eachWord'>
                        <h1 className='landingTitle'>M</h1>
                        <h1 className='landingTitle'>A</h1>
                        <h1 className='landingTitle'>P</h1>
                    </div>
                    <div className='eachWord'>
                        <h1 className='landingTitle'>'</h1>
                        <h1 className='landingTitle'>E</h1>
                        <h1 className='landingTitle'>M</h1>
                    </div>
                    <div className='eachWord'>
                        <h1 className='landingTitle'>A</h1>
                        <h1 className='landingTitle'>L</h1>
                        <h1 className='landingTitle'>L</h1>
                    </div>
                </div>
                <div className='ButtonDiv'>
                    <Link to='/home'>
                        <button className='Button' id='tryButton'>Enter</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}