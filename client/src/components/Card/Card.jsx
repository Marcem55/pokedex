import React from 'react'
import './Card.css';
import './TypeStyles.css';


export default function Card({name, image, types}) {
  return(
    <div className={`contenedor ${types}`}>
      <div className='card_body'>
        <h2>{name}</h2>
        <h3>Type: {`${types}`}</h3>
      </div>
      <div className='card_img'>
        <img src={image} className='pokeSprite' alt="sprite img"/>
      </div>
    </div>
  )

}