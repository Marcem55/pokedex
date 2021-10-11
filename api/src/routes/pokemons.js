const { Router } = require('express');
const { getApiPokemons } = require('../controllers/pokemonControllers/getApiPokemons');
const { getDbPokemons } = require('../controllers/pokemonControllers/getDbPokemons');

const router = Router();

router.get('/', getApiPokemons);
router.get('/', getDbPokemons);

module.exports = router;
