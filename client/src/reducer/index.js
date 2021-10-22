import { GET_POKEMONS, GET_TYPE, POKEMON_FILTER_TYPE, GET_POKEMON_DETAIL, GET_POKEMON_BY_NAME, IS_CREATED, ORDER_BY_NAME, ORDER_BY_FORCE } from "../actions/index";

const initialState = {
	allPokemons: [],
	pokemonsFilter: [],
	pokemonDetail: [],
	pokemonsTypes: [],
};

export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TYPE:
			return {
				...state,
				pokemonsTypes: action.payload
			};
		case GET_POKEMONS:
			state.pokemonsFilter = [];
			return {
				...state,
				allPokemons: action.payload,
				pokemonsFilter: action.payload
			};
		case GET_POKEMON_BY_NAME:
			return {
				...state,
				pokemonsFilter: action.payload
			};
		case GET_POKEMON_DETAIL:
			return {
				...state,
				pokemonDetail: action.payload
			};
		case POKEMON_FILTER_TYPE:
			let pokemons = state.allPokemons;
			let filteredPokemons = action.payload === 'All' 
			? pokemons
			: pokemons.filter(t => {
				return t.types?.includes(action.payload)
			});
			return {
				...state,
				pokemonsFilter: filteredPokemons
			};
		case ORDER_BY_NAME:
			if(action.payload === 'az') {
				return {
					...state,
					pokemonsFilter: [...state.pokemonsFilter].sort((a, b) => 
						a.name > b.name ? 1 : -1
					)
				}
			} else {
				return {
					...state,
					pokemonsFilter: [...state.pokemonsFilter].sort((a, b) =>
						a.name > b.name ? -1 : 1
					)
				}
			}
		case ORDER_BY_FORCE:
			if(action.payload === 'strong') {
				return {
					...state,
					pokemonsFilter: [...state.pokemonsFilter].sort((a, b) =>
						a.attack > b.attack ? 1 : -1
					)
				}
			} else {
				return {
					...state,
					pokemonsFilter: [...state.pokemonsFilter].sort((a, b) =>
						a.attack > b.attack ? -1 : 1
					)
				}
			};
		case IS_CREATED:
			let createdPokemons = state.allPokemons;
			let pokemonsFiltered = action.payload === 'created'
			? createdPokemons.filter(p => p.createInDb)
			: createdPokemons.filter(p => !p.createInDb);
			return action.payload === 'all'
			? {
				...state, 
				pokemonsFilter: createdPokemons
			}
			: {...state, 
				pokemonsFilter: pokemonsFiltered
			};
		case "POST_POKEMON": //back por body
			return {
				...state,
			};
		default:
			return state;
	}
};