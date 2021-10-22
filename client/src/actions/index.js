import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPE = 'GET_TYPE';
export const POKEMON_FILTER_TYPE = 'POKEMON_FILTER_TYPE';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const IS_CREATED = 'IS_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_FORCE = 'ORDER_BY_FORCE';

export const getPokemons = () => {
    return async (dispatch) => {
        try {
            const allPokemons = await axios.get("http://localhost:3001/pokemons"); // Hago el request a mi back
            return dispatch({
                type: GET_POKEMONS,
                payload: allPokemons.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const getPokemonsTypes = () => {
    return async (dispatch) => {
        try {
            const pokemonsTypes = await axios.get("http://localhost:3001/types");
            return dispatch({
                type: GET_TYPE,
                payload: pokemonsTypes.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const filterType = (type) => {
    return async (dispatch) =>
        dispatch({ 
            type: POKEMON_FILTER_TYPE, 
            payload: type.toLowerCase()
        })
};

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            const pokemonDetail = await axios(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: pokemonDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {
            const pokemonName = await axios(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: pokemonName.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const addPokemon = (newPoke) => {
    return async () => {
        try {
            const objNewPoke = {
                name: newPoke.name,
                life: newPoke.life,
                attack: newPoke.attack,
                defense: newPoke.defense,
                speed: newPoke.speed,
                weight: newPoke.weight,
                height: newPoke.height,
                types: [newPoke.type1, newPoke.type2],
            }
            const createdPoke = await axios.post("http://localhost:3001/pokemons", objNewPoke);
            return console.log(createdPoke.data);
        } catch (error) {
            console.log(error)
        }
    }
};

export const isCreated = (payload) => {
    return {
        type: 'IS_CREATED',
        payload
    }
};

export const orderByName = (order) => {
    return {
        type: 'ORDER_BY_NAME',
        payload: order
    }
};

export const orderByForce = (order) => {
    return {
        type: 'ORDER_BY_FORCE',
        payload: order
    }
};