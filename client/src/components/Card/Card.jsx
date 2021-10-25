import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";


export default function Card({id, image, name, types}) {
    
    return (
        <div key={id} className='pokemonCard'>
            <Link to={`/${id}`}>
            <img src={image} alt='pokemon view' className='img'/>
            <p className='p'><b>{name}</b></p>
            <p className='p'>{types}</p>
            </Link>
        </div>
    )
};