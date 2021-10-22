import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchName, setPage } from '../../actions/index';
import './NavBar.css';

export default function NavBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(setPage(1));
        dispatch(searchName(name));
    }

    return (
        <div className='NavDiv'>

            <Link to='/home' className='Logo'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9P5FQ52hLD9KM-RFncgcxiOOEUBdHow3YA&usqp=CAU" alt="" />
                <div className='TitleNav'>
                    <h2>HENRY</h2>
                </div>
            </Link>
            <Link to='/create' className='CreateNav'>
                <h2> Create </h2>
                <h2> Pokemon </h2>
            </Link>
            <Link to='/about' className='AboutNav'>
                <h2>About</h2>
            </Link>
            <input
                type='text'
                className='Input'
                placeholder=' Search...'
                onChange={(e) => handleInputChange(e)}
            />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4hwkYAVTWO4rBfBkjHU9YmbaWjkfUj4IZA&usqp=CAU" alt="" className='ButtonNav'  onClick={(e) => handleSubmit(e)}/>
        </div>
    )
};