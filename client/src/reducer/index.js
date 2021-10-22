const initialState = {
	allPokemons: [],
    pokemonsCopy: [],
    pokemonsTypes: [],
    pokemonDetail: [],
    popup: false,
    id: null,
    page: 1
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemonsCopy: action.payload,
                allPokemons: action.payload,
            };
        case 'GET_TYPES':
            return {
                ...state,
                pokemonsTypes: action.payload
            };
        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            const allOriginals = allPokemons.filter(p => p.types);
            const allCreated = allPokemons.filter(p => p.types);
            const typeFilteredOG = action.payload === 'all' ? allOriginals : allOriginals.filter(p => p.types[0] === action.payload || p.types[1] === action.payload);
            const typeFilteredCT = action.payload === 'all' ? allCreated : allCreated.filter(p => p.types[0].name === action.payload || p.types[1].name === action.payload);
            const typeFiltered = typeFilteredOG.concat(typeFilteredCT);
            return {
                ...state,
                pokemonsCopy: typeFiltered
            };
        case 'FILTER_BY_ORIGIN':
            const allPokemonsOrigin = state.allPokemons;
            const prop = action.payload;
            const originFiltered = allPokemonsOrigin.filter(p => p[prop])
            return {
                ...state,
                pokemonsCopy: originFiltered
            };
        case 'ORDER_BY_NAME':
            const allOrderedByName = state.pokemonsCopy;
            const allOgByName = allOrderedByName.filter(p => p.types);
            const allCtByNameRaw = allOrderedByName.filter(p => p.types);
            const allCtByNameFixed = [];
            allCtByNameRaw.forEach(p => {
                allCtByNameFixed.push({
                    name: p.name,
                    img: p.image,
                    types: [p.types[0].name, p.types[1].name]
                })
            });
            let finalOrdered = allOgByName.concat(allCtByNameFixed);
            let orderedNames = action.payload === 'alpha-Asc' ?
                finalOrdered.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                finalOrdered.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemonsCopy: orderedNames
            };
        //FUERZA
        case 'ORDER_BY_FORCE':
            const allOrderedByForce = state.pokemonsCopy;
            const allOgByForce = allOrderedByForce.filter(p => p.types);
            const allCtByForceRaw = allOrderedByForce.filter(p => p.types);
            const allCtByForceFixed = [];
            allCtByForceRaw.forEach(p => {
                allCtByForceFixed.push({
                    name: p.name,
                    img: p.image,
                    types: [p.types[0].name, p.types[1].name],
                    attack: p.attack
                })
            });
            let finalOrderedF = allOgByForce.concat(allCtByForceFixed);
            let orderedForces = action.payload === 'force-Asc' ?
                finalOrderedF.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                }) :
                finalOrderedF.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemonsCopy: orderedForces
            };
        case 'SEARCH_NAME':
            return {
                ...state,
                pokemonsCopy: action.payload
            };
        case 'POST_POKEMON':
            return {
                ...state
            };
        case 'SEARCH_ID':
            return {
                ...state,
                pokemonDetail: action.payload
            };
        case 'CHANGE_POPUP':
            return {
                ...state,
                popup: action.payload[0],
                id: action.payload[1]
            };
        case 'RESET_DETAIL':
            return {
                ...state,
                pokemonDetail: []
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;