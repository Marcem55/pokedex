const { Pokemon, Type } = require('../../db');

const getDbPokemons = async (req, res, next) => {
    try {
        const dbPokemons = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name']
            }
        });
        return dbPokemons;
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDbPokemons
}