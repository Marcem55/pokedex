const { Pokemon } = require('../db');
const { Type } = require('../db')
const axios = require('axios');

const getApiPokemons = async (req, res) => {

    try {

        // array with all pokemon names
        let pokNames = [];

        // object filter to return
        let pokObj = [];
        /*     pokObj = [{
                name,
                types,
                image
            }]
         */

        // search in API to get the pokemons names
        const p1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const p2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        const promises = await Promise.all([p1, p2])
        const result = [...promises[0].data.results, ...promises[1].data.results]
        result.forEach(pokemon => {
            pokNames.push(pokemon.name)
        })

        // get object for each pokemon
        const results = await Promise.all(
            pokNames.map(async (name) => {
                return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            })
        );


        // create an object for each pokemon with name, types and image
        results.forEach(pok => {
            const image = pok.data.sprites.other['official-artwork'].front_default;
            const types = pok.data.types.map(e => {
                return e.type.name;
            })
            const attack = pok.data.stats[1].base_stat;
            const name = pok.data.name;
            const id = pok.data.id

            let obj = {
                id,
                name,
                image,
                types,
                attack
            }

            pokObj.push(obj)
        })

        return res.status(200).json(pokObj)

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const getDbPokemons = async (req, res) => {
    try {
        let pokemons = [];
        let pokObj = []

        try {
            // search pokemons in DB
            pokemons = await Pokemon.findAll({
                include: Type
            });
        }
        catch (err) {
            res.status(401).json("Error in DB query")
        };

        pokemons.forEach(pok => {
            const types = pok.types.map(e => {
                return e.name;
            })
            const attack = pok.attack
            const name = pok.name;
            const id = pok.id
            const image = pok.image

            let obj = {
                id,
                name,
                types,
                attack,
                image
            }

            pokObj.push(obj)
        })

        return res.status(200).json(pokObj);
    }
    catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const getPokemons = async (req, res) => {
    try {
        // array for all pokemons
        let allPokemons = [];


        // array for pokemon names
        let pokNames = [];

        // filtered object to return
        let pokApiObj = [];
        /*     pokObj = [{
                name,
                types,
                image
            }]
         */
        try {
            // search in API to get the pokemons names        
            const p1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
            const p2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
            const promises = await Promise.all([p1, p2])
            const result = [...promises[0].data.results, ...promises[1].data.results]
            result.forEach(pokemon => {
                pokNames.push(pokemon.name)
            })

            // get object for each pokemon
            const results = await Promise.all(
                pokNames.map(async (name) => {
                    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                })
            );

            // create an object for each pokemon with name, types and image
            results.forEach(pok => {
                const image = pok.data.sprites.other['official-artwork'].front_default;
                const types = pok.data.types.map(e => {
                    return e.type.name;
                })
                const attack = pok.data.stats[1].base_stat;
                const name = pok.data.name;
                const id = pok.data.id

                let obj = {
                    id,
                    name,
                    image,
                    types,
                    attack
                }

                pokApiObj.push(obj)
            });
        } catch (err) {
            res.status(400).json({
                message: "Error API query",
                message: err
            })
        };


        // array for all pokemons DB
        let pokemons = [];

        // filetered object to return
        let pokDbObj = []
        /*     pokDbOBj = [{
        name,
        types,
        image
    }]
    */
        try {
            // search pokemons in DB
            pokemons = await Pokemon.findAll({
                include: Type
            });

            pokemons.forEach(pok => {
                const types = pok.types.map(e => {
                    return e.name;
                })
                const attack = pok.attack
                const name = pok.name;
                const id = pok.id
                const image = pok.image

                let obj = {
                    id,
                    name,
                    types,
                    attack,
                    image
                }

                pokDbObj.push(obj)
            })
        }
        catch (err) {
            res.status(400).json({
                message: "Error DB query",
                error: err
            })
        };

        allPokemons = [...pokDbObj, ...pokApiObj];

        return res.status(200).json(allPokemons);
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const getPokemonsByName = async (req, res) => {
    try {
        // name from url query
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                message: "Please insert name"
            })
        }

        // variables to validate
        let apiPok = "";
        let dbPok = "";
        let apiObj = [];
        let dbObj = [];

        // search in DB
        try {
            dbPok = await Pokemon.findOne({
                include: Type,
                where: {
                    name: name
                }
            })

            const name = dbPok.name;
            const types = dbPok.types.map(t => {
                return t.name;
            });
            const attack = dbPok.attack;
            const id = dbPok.id;
            const image = dbPok.image;

            dbObj = {
                id,
                name,
                attack,
                types,
                image
            }

        } catch (err) {
            console.log("Pokemon does not exist in DB");
        }

        // search in API
        try {
            apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const name = apiPok.data.name;
            const image = apiPok.sprites.other['official-artwork'].front_default;
            const types = apiPok.data.types.map(t => {
                return t.type.name;
            });
            const attack = apiPok.data.stats[1].base_stat;
            const id = apiPok.data.id;

            apiObj = {
                id,
                name,
                image,
                attack,
                types
            }
        }
        catch (err) {
            console.log("Pokemon does not exist in API");
        }

        if (apiPok !== "") {
            return res.status(200).json(apiObj);
        }

        else if (dbPok !== "") {
            return res.status(200).json(dbObj)
        } else {
            return res.status(401).json({
                message: "Pokemon does not exists"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
};

const getPokemonById = async (req, res) => {

    try {
        const { id } = req.params;

        // variables to validate
        let apiPok = "";
        let dbPok = "";
        let apiObj = [];
        let dbObj = [];

        /*         // var to check if id model looks like xxxx-xxxx-xxx
                const idVer = id.includes('-'); */
        try {
            dbPok = await Pokemon.findOne({
                include: Type,
                where: {
                    id
                }
            });

            const pokId = dbPok.id;
            const name = dbPok.name;
            const types = dbPok.types.map(t => {
                return t.name;
            });
            const weight = dbPok.weight;
            const height = dbPok.height;
            const life = dbPok.life;
            const attack = dbPok.attack;
            const defense = dbPok.defense;
            const speed = dbPok.speed;
            const image = dbPok.image;


            dbObj = {
                id: pokId,
                name,
                image,
                types,
                life,
                attack,
                defense,
                speed,
                weight,
                height
            }

            return res.status(200).json(dbObj);

        } catch (err) {
            console.log("Pokemon does not exist in DB");
        }

        // search in API
        try {
            apiPok = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        }
        catch (err) {
            console.log("Pokemon does not exist in API");
        }

        const pokId = apiPok.data.id;
        const name = apiPok.data.name;
        const image = apiPok.sprites.other['official-artwork'].front_default;
        const types = apiPok.data.types.map(t => {
            return t.type.name;
        });
        const life = apiPok.data.stats[0].base_stat;
        const attack = apiPok.data.stats[1].base_stat;
        const defense = apiPok.data.stats[2].base_stat;
        const speed = apiPok.data.stats[5].base_stat;
        const weight = apiPok.data.weight;
        const height = apiPok.data.height;


        apiObj = {
            id: pokId,
            name,
            image,
            types,
            life,
            attack,
            defense,
            speed,
            weight,
            height
        }

        if (apiPok !== "") {
            return res.status(200).json(apiObj);
        }

        if (id === undefined) {
            return res.status(400).json({
                message: "Does not exist pokemon with that id"
            });
        }
    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "Query error"
        });
    }
};

const createPokemon = async (req, res) => {
    try {
        const { name, life, attack, defense, speed, height, weight, image, types } = req.body;

        // validate if Pokemon exists or not in DB
        const validatePok = await Pokemon.findOne({
            where: {
                name: name
            }
        });

        if (validatePok === null) {
            // create a new instance of Pokemon
            const newPokemon = await Pokemon.create({
                name,
                life,
                attack,
                defense,
                speed,
                height,
                weight,
                image
            });

            await newPokemon.addTypes(types);

            return res.status(200).json(newPokemon);
        }

        return res.status(401).json({
            message: "Pokemon already exists in DB"
        });


    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "Pokemon can not be created"
        })
    }
};

module.exports = { getPokemonsByName, getPokemonById, createPokemon, getPokemons, getDbPokemons, getApiPokemons };