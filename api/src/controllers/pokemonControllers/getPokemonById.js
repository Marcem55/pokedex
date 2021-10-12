const axios = require('axios');
const { Pokemon, Type } = require('../../db');

const getPokemonById = async (req, res) => {
    const { id } = req.params;

    // Pregunto si el id incluye guiones por ser UUIDV4 (osea pokemons de mi db)
    if (id.includes('-')) {
        try {
            const searchDbPokemon = await Pokemon.findByPk(id, {include: Type});
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
        } catch (error) {
            res.status(400).json({message: 'Pokemon not found, please enter another id'});
        }
    } else { // Si no incluye el '-', busco por pokemons de la API que tienen ids numericos
        try {
            const searchApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            // console.log(searchApiPokemon); 
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
        } catch (error) {
            res.status(400).json({message: 'Pokemon not found, please enter another id'});
        }
    }
};

module.exports = {
    getPokemonById
}