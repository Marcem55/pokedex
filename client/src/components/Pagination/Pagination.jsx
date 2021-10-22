import React from 'react';
import { setPage } from '../../actions/index';
import { useDispatch } from 'react-redux';
import './Pagination.css';

export default function Pagination({ pokemonsPerPage, allPokemons}) {
    const pageNumbers = [];
    const dispatch = useDispatch();
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handleOnPage(p) {
        dispatch(setPage(p))
    }

    return (
        <footer className='footer'>
            <div className='Pages'>
                {
                    pageNumbers && pageNumbers.map(p => {
                        return (
                            <div>
                                <button className='Page' onClick={() => handleOnPage(p)} >{p}</button>
                            </div>
                        )
                    })
                }
            </div>
        </footer>
    )
};