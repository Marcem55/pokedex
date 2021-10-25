import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";


export default function Card({id, img, name, types}) {
    
    return (
        <div key={id} className='pokemoncard'>
            <Link to={`/${id}`}>
            <img src={img} alt='img' className='img'/>
            <p className='p'><b>{name}</b></p>
            <p className='p'>{types}</p>
            </Link>
        </div>
    )
};