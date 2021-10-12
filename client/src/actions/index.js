import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_TYPES = 'GET_TYPES'

export const getPokemons = () => {
    return async function(dispatch) {
        try {
            const result = await axios.get('http://localhost:3001/pokemons');
            return dispatch({
                type: GET_POKEMONS,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const getPokemonDetail = (id) => {
    return async function(dispatch) {
        try {
            const pokemon = await axios.get(`http://localhost:3001/pokemon/${id}`);
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const getPokemonName = (name) => {
    return async function(dispatch) {
        try {
            const pokemon = await axios.get(`http://localhost:3001/pokemon/search?name=${name}`);
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const addPokemon = (pokemon) => {
    return async function(dispatch) {
        try {
            const createdPokemon = await axios.post('http://localhost:3001/pokemons', data);
            return dispatch({
                type: CREATE_POKEMON,
                payload: createdPokemon.data
            })
        } catch (error) {
            
        }

    }
};

export const getTypes = () => {
    return async function(dispatch) {
        try {
            const result = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: GET_TYPES,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};