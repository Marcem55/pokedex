const { Router } = require('express');
const { getPokemonById } = require('../controllers/pokemonControllers/getPokemonById');
const { getPokemonByName } = require('../controllers/pokemonControllers/getPokemonByName');

const router = Router();

router.get('/:id', getPokemonById);
router.get('/:name', getPokemonByName);

module.exports = router;
