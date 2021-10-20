const { Router } = require('express');
const { getAllPokemons, getPokemonById, getPokemonByName, createPokemon } = require('../controllers/pokemonControllers');

const router = Router();

// getAllPokemons & getPokemonsByName
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if(!name) {
            return res.status(200).send(await getAllPokemons());
        } else {
            const pokeByName = await getPokemonByName(name);
            if(pokeByName) {
                return res.status(200).json(pokeByName);
            }
        }
    } catch (error) {
        console.log('error');
        return res.status(400).send('Pokemon not found');
    }
});

// getPokemonById
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pokeById = await getPokemonById(id);
        if(pokeById) {
            return res.status(200).json(pokeById);
        }
    } catch (error) {
        console.log('error');
        return res.status(400).send('Pokemon not found');
    }
});

// createPokemon
router.post('/', async (req, res) => {
    try {
        const newPoke = req.body;
        await createPokemon(newPoke);
        return res.status(200).send('Successfully created pokemon')
    } catch (error) {
        console.log('error');
        res.status(400).send("Can't create pokemon")
    }
});

module.exports = router;
