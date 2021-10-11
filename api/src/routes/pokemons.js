const { Router } = require('express');
const { getApiPokemons } = require('../controllers/pokemonControllers/getApiPokemons');

const router = Router();

router.get('/', getApiPokemons);

module.exports = router;
