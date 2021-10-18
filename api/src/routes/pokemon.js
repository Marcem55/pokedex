const { Router } = require('express');
const { createPokemon } = require('../controllers/pokemonControllers/createPokemon');
const { getPokemonById } = require('../controllers/pokemonControllers/getPokemonById');
const { getPokemonByName } = require('../controllers/pokemonControllers/getPokemonByName');

const router = Router();

router.get('/:id', getPokemonById);
router.get('/search', getPokemonByName);
router.post('/create', createPokemon);

module.exports = router;
