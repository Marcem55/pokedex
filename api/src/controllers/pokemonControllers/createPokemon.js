const { Pokemon, Type } = require("../../db");

const createPokemon = async (req, res) => {
    try {
        const {
            name,
            image,
            types,
            life,
            attack,
            defense,
            speed,
            height,
            weight
        } = req.body;

        const newPokemon = {
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight
        };
        Pokemon.create(newPokemon)
        .then(poke => {
            poke.addTypes(types);
            res.status(200).json({...poke, types})
        })
        .catch(err => {console.log(err)});
    } catch (error) {
        res.status(400).json({error: 'Could not create'});
    }
};

module.exports = {
    createPokemon
}