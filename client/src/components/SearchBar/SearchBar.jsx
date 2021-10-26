import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanSearchResult, filterItems, getTypes, orderItems, searchName } from "../../actions/index";
import { Link } from "react-router-dom";
import { fromAtoZ, pokeball } from "../../helpers/index";
import "./SearchBar.css";


export default function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    const types = useSelector((state) => state.types.sort(fromAtoZ));
    const search = useSelector((state) => state.search);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    let pokemon = search.found[0];


    function validateInput(e) {
        if(!/^[A-Za-z]+$/.test(e)) {setError("Only letters is allow")}
        else {setError(''); setInput(e)}
        setInput(e)
    };

    return (
        <div className='search_filter_bar'>
            {/* <form> */}
            <div className='searchForm'>
                <label>Find Pokemon </label>
                <input
                className='searchInput'
                type='text'
                value={input}
                placeholder='Search Pokemon...'
                autoComplete='off'
                required
                onChange={e => validateInput(e.target.value)}
                />
                {error ? 
                <span>Pokemon not found</span>
                : 
                <button
                className='searchBtn'
                value='Search'
                onClick={() => {dispatch(searchName(input.toLowerCase())); setInput('')}}
                >Search</button>
                }
                <div className='ovHidden'>
                    {search.loading ? <img style={{width: 50}} src={pokeball}/> : null}
                    {search.notfound !== '' ? <span>{search.notfound}</span>
                    : null}
                    {
                        pokemon && 
                        <Link className='no-sub' to={`/${pokemon.id}`}>
                        <img src={pokemon.image} alt={pokemon.name} width='30px'/>
                        <span className='searchPokeName' onClick={e => dispatch(cleanSearchResult)}> {pokemon.name}</span>
                        </Link>
                    }
                </div>
            </div>
            {/* </form> */}
            <div id='filterdiv'>
                <form id='filterdiv'>
                <label>Filter </label>
                    <select 
                    className='selectFilter'
                    data-default-value='choose'
                    onChange={e => {dispatch(filterItems(e.target.value)); setCurrentPage(1)}}>
                        <option value='choose'>Choose option</option>
                        <optgroup label='By Origin' selected>
                            <option value="created">Created Pokemons</option>
                            <option value="existing">Existing Pokemons</option>
                        </optgroup>
                        <optgroup label='By Type'>
                                {
                                    types.map( ({id, name}) => (
                                        <option 
                                        key={id}
                                        value={name}
                                        >{name}</option>
                                    ))
                                }
                        </optgroup>
                    </select>

                    <label>Order </label>
                    <select 
                    id='order_filter'
                    data-default-value='choose'
                    onChange={e => {
                        dispatch(orderItems(e.target.value))
                        setCurrentPage(1)}}>
                    <option value='choose'>Choose option</option>
                        <optgroup label='By Name'>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </optgroup>
                        <optgroup label='By Attack'>
                            <option value="10-1">Higher to lower</option>
                            <option value="1-10">Lower to higher</option>
                        </optgroup>
                    </select>
                    <input type='reset' 
                    className='resetBtn' 
                    value='Reset' 
                    onClick={(e) => {dispatch({type:"CLEAN_FILTERS"}); setCurrentPage(1);}} />
                </form>
            </div>
        </div>
    )
};