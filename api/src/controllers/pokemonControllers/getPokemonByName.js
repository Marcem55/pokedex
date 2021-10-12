const axios = require('axios');
const { Pokemon, Type, Op } = require('../../db');

const getPokemonByName = async (req, res) => {
    const { name } = req.params; // Saco el name de params

    if(!name) { // Si no hay nombre
        res.status(400).json({message: 'Pokemon not found'});
    } else { // Si hay, empiezo a buscar en la base de datos
        try {
            const searchDbPokemon = await Pokemon.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: {
                    model: Type
                }
            });
            if(searchDbPokemon) {
                let dbPokemon = {
                    id: searchDbPokemon.id,
                    name: searchDbPokemon.name,
                    image: searchDbPokemon.image,
                    types: searchDbPokemon.types.map(t => t.type.name),
                    life: searchDbPokemon.life,
                    attack: searchDbPokemon.attack,
                    defense: searchDbPokemon.defense,
                    speed: searchDbPokemon.speed,
                    height: searchDbPokemon.height,
                    weight: searchDbPokemon.weight
                }
                return res.status(200).json(dbPokemon);
            } else {
                const searchApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                let apiPokemon = { // tengo que ingresar a .data para sacar la info del request
                    name: searchApiPokemon.data.name,
                    id: searchApiPokemon.data.id,
                    image: searchApiPokemon.data.sprites.other['official-artwork'].front_default, // Bracket notation para acceder al valor ya que no puedo con Dot notation por el '-'
                    types: searchApiPokemon.data.types.map(t => t.type.name),
                    life: searchApiPokemon.data.stats[0].base_stat,
                    attack: searchApiPokemon.data.stats[1].base_stat,
                    defense: searchApiPokemon.data.stats[2].base_stat,
                    speed: searchApiPokemon.data.stats[5].base_stat,
                    height: searchApiPokemon.data.height,
                    weight: searchApiPokemon.data.weight
                }
                return res.status(200).json(apiPokemon);
            }
        } catch (error) {
            res.status(400).json({message: 'Pokemon not found'});
        }
    }
};

module.exports = {
    getPokemonByName
}