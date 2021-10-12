const { Router } = require('express');
// Importar todos los routers;
const pokemonsRouter = require('./pokemons.js');
const pokemonRouter = require('./pokemon.js');
const typesRouter = require('./type.js');
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRouter);
router.use('/pokemon', pokemonRouter);
router.use('/types', typesRouter);

module.exports = router;
