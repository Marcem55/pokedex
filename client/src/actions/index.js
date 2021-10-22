import axios from 'axios';

export const getPokemons = () => {
    return async (dispatch) => {
        const allPokemons = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: allPokemons.data
        })
    }
};


export const getTypes = () => {
    return async (dispatch) => {
        const allTypes = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: allTypes.data
        })
    }
};

export const filterPokemonsByType = (payload) => {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
};

export const filterPokemonsByOrigin = (payload) => {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export const orderPokemonsByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const orderPokemonsByForce = (payload) => {
    return {
        type: 'ORDER_BY_FORCE',
        payload
    }
}

export const searchName = (name) => {
    return async (dispatch) => {
        const pokeName = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        return dispatch({
            type: 'SEARCH_NAME',
            payload: pokeName.data
        })
    }
};

export const getPokemonById = (id) => {
    return async (dispatch) => {
        const pokeId = await axios.get(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type: 'SEARCH_ID',
            payload: pokeId.data
        })
    }
};

export const postPokemon = (payload) => {
    const newPoke = axios.post('http://localhost:3001/pokemons', payload)
    return newPoke;
};

export const changePopup = (payload) => {
    return {
        type: 'CHANGE_POPUP',
        payload
    }
};

export const resetDetail = () => {
    return {
        type: 'RESET_DETAIL'
    }
};

export const setPage = (payload) => {
    return {
        type: 'SET_PAGE',
        payload
    }
};