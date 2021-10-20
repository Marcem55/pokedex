const axios = require('axios');
const { Pokemon, Type } = require('../db');

// me traigo los pokemons de la API
const getApiPokemons = async () => {
    try {
        const allPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); // Hasta aca tengo los 40 pokemons
        // console.log(allPokemons);
        const eachPokemonInfo = allPokemons.data.results.map(obj => axios.get(obj.url));
        const infoUrlPokemons = await axios.all(eachPokemonInfo); // traigo la info de cada pokemon (a su url)

        let pokemons = infoUrlPokemons.map(obj => obj.data);  // obtengo la data de cada uno
        let infoPokemons = pokemons.map(poke => objPokemon(poke));

        return infoPokemons;

    } catch (error) {
        console.log(error);

        return error;
    }
};

// me traigo los pokemons de la DB
const getDbPokemons = async () => {
    try {
        const pokeDb = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
            }
        });

        return pokeDb;

    } catch (error) {
        console.log(error);

        return error;
    }
};

// Junto los apiPokemons y los dbPokemons
const getAllPokemons = async () => {
    try {
        const apiPokemons = await getApiPokemons();
        const dbPokemons = await getDbPokemons();
        const allPokemons = [...apiPokemons, ...dbPokemons];
        // console.log(allPokemons)

        return allPokemons;

    } catch (error) {
        console.log(error);

        return error;
    }
};

// Traigo el pokemon por nombre
const getPokemonByName = async (name) => {
    try {
        const dbPoke = await Pokemon.findOne({
            where: { name },
            include: { model: Type }
        })
        if (dbPoke) {
            let dbPokemonObj = {
                id: dbPoke.id,
                name: dbPoke.name,
                image: dbPoke.image,
                types: dbPoke.types.map(t => t.type.name),
                life: dbPoke.life,
                attack: dbPoke.attack,
                defense: dbPoke.defense,
                speed: dbPoke.speed,
                height: dbPoke.height,
                weight: dbPoke.weight,
            }

            return dbPokemonObj;

        }else {
            const apiPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const apiPokemonObj = objPokemon(apiPoke.data);

            return apiPokemonObj;
        }
    } catch (error) {
        console.log(error);

        return error;
    }
};

// Traigo el pokemon por ID
const getPokemonById = async (id) => {
    try {
        if (id.length > 3) { // Valido el id
            const dbPoke = await Pokemon.findOne({where: {id}, include: Type});
            let dbPokemonObj = {
                id: dbPoke.id,
                name: dbPoke.name,
                image: dbPoke.image,
                types: dbPoke.types.map(t => t.type.name),
                life: dbPoke.life,
                attack: dbPoke.attack,
                defense: dbPoke.defense,
                speed: dbPoke.speed,
                height: dbPoke.height,
                weight: dbPoke.weight,
            }

            return dbPokemonObj;

        } else {
            const apiPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const apiPokemonObj = objPokemon(apiPoke.data);

            return apiPokemonObj;
        }
    } catch (error) {
        console.log(error);
        
        return error;
    }
};

const objPokemon = (poke) => {
    const objPokemon = {
        id: poke.id,
        name: poke.name,
        image: poke.sprites.other['official-artwork'].front_default,
        types: poke.types.map(t => t.type.name),
        hp: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        speed: poke.stats[5].data_stat,
        height: poke.height,
        weight: poke.weight,
    }

    return objPokemon;
}

// Crear un pokemon
const createPokemon = async (newPokemon) => {
    try {
        const { name, types, image, life, attack, defense, speed, height, weight } = newPokemon;
        const myNewPokemon = await Pokemon.create(
            {
                name,
                image,
                life,
                attack,
                defense,
                speed,
                height,
                weight,
            }
        );
        const pokemonTypes = await Type.findAll({
            where: { name: types }
        });

        let fullPokemon = myNewPokemon.addType(pokemonTypes);

        return fullPokemon;

    } catch (error) {
        console.log(error);

        return error;
    }
};

module.exports = {
    getApiPokemons,
    getDbPokemons,
    getAllPokemons,
    getPokemonByName,
    getPokemonById,
    createPokemon,
};