import React from 'react';
import { Link } from 'react-router-dom';
import { changePopup, getPokemonById } from '../../actions/index';
import { useDispatch } from 'react-redux';
import './Card.css';

export default function Card({ name, types, img, id }) {
    const dispatch = useDispatch();
    let nameF = name[0].toUpperCase() + name.slice(1);
    let bothTypes = { types };
    let type1 = bothTypes.types[0];
    let type1F = type1[0].toUpperCase() + type1.slice(1);
    let type2 = bothTypes.types[1];
    if (type2) {
        type2 = type2[0].toUpperCase() + type2.slice(1);
    }

    function handlePopup(bool, id) {
        dispatch(changePopup(bool, id))
    }

    return (
        <span onClick={() => handlePopup([true, id])}>
            <div className='cardDiv'>
                <div className='Card' id={type1F.toLowerCase()}>
                    <img src={img} alt="img not found" className='Img' />
                    <h5 className='demotext'>{nameF}</h5>
                    <h6 className='demotext'>{type1F} {type2}</h6>
                </div>
            </div>
        </span>
    )
};