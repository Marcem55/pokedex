import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";


export default function Card({id, image, name, types}) {
    
    return (
        <div  key={id} className='card'>
            <div className='ovHidden'>
                <Link to={`/${id}`}>
                    <img src={image} alt='pokemon view' className='pokeImg'/>
                </Link>
            </div>
            <p className='pokeName'><b>{name}</b></p>
            {/* {console.log(types)} */}
            <p className='pokeTypes'>{types}</p>
        </div>
            
    )
};