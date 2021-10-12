const { Pokemon } = require("../../db");

const createPokemon = async (req, res) => {

    try {
        const { name, life, attack, defense, speed, height, weight,image, types } = req.body;

        const createdPokemon = await Pokemon.create({
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

        return res.status(200).json(createdPokemon);
    } catch (error) {
        return res.status(400).json({error: 'No se pudo crear'});
    }
};

module.exports = {
    createPokemon
}