import React from "react";
import './Card.css'


export default function Card({ name, image, types }){
    return(
        
        <div className='div'>
            <h3 className='name'>{name}</h3>
            <img className='img' src={image} alt="img not found" width="200px" height="250px"/>
            <h5 className='type'>{types}</h5>
        </div>
    )
};