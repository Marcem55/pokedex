import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from '../actions';
import { NavBar } from '../components/NavBar/NavBar';
import { Pokedex } from '../components/Pokedex/Pokedex';
import Loader from '../components/Loader/Loader'

export const Home = () => {
    const dispatch = useDispatch();
    const allPokes = useSelector(state => state.allPokemons);

    useEffect( () => {
        dispatch(getPokemons())
    }, [dispatch]);

    return (
        <div>
            <NavBar />
            {allPokes.length > 0 ? <Pokedex allPokes={allPokes}/> : <Loader/>}
        </div>
    )
};