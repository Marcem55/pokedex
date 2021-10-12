const { Router } = require('express');
const { getPokemonById } = require('../controllers/pokemonControllers/getPokemonById');

const router = Router();

router.get('/:id', getPokemonById);

module.exports = router;
