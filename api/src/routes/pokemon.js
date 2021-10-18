const { Router } = require('express');
const { getPokemonById, createPokemon, getPokemons, getPokemonsByName, getDbPokemons, getApiPokemons } = require('../controllers/pokemonControllers');

const router = Router();

// get all pokemons (API + DB) filter pokemon name, types and image
router.get('/all', getPokemons);

// get pokemons from DB
router.get('/db', getDbPokemons);

// get pokemons from API
router.get('/api', getApiPokemons);

// find by name
router.get('/', getPokemonsByName);

// find by id
router.get('/:id', getPokemonById);

// create a new Pokemon in DB
router.post('/', createPokemon);


module.exports = router;
