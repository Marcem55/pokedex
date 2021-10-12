const axios = require('axios');

const getApiPokemons = async (req, res, next) => {
    try {
        let pokemons1 = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data; // Primer pedido a la API
        let pokemons2 = (await axios.get(pokemons1.next)).data; // 2do pedido
        let pokemons3 = (await axios.get(pokemons2.next)).data; // Y uno masss
        let allPokemons = pokemons1.results.concat(pokemons2.results.concat(pokemons3.results)); // Concateno los resultados
        // console.log(allPokemons);
        let pokemonDataUrl = allPokemons.map(poke => {
            return axios.get(poke.url); // Saco la info de cada pokemon desde su url
        });
        // console.log(pokemonDataUrl);
        pokemonData = await Promise.all(pokemonDataUrl) // Incluyo el await porque sino la promesa queda en 'pending'
        // console.log(pokemonData);
        .then(poke => {
            let pokemon = poke.map(pok => pok.data);
            // console.log(pokemon);
            let pokeData = []; // Array para la info de cada pokemon
            pokemon.map(p => {
                pokeData.push({
                    name: p.name,
                    id: p.id,
                    image: p.sprites.other['official-artwork'].front_default, // Bracket notation para acceder al valor ya que no puedo con Dot notation por el '-'
                    types: p.types.map(t => t.type.name),
                    life: p.stats[0].base_stat,
                    attack: p.stats[1].base_stat,
                    defense: p.stats[2].base_stat,
                    speed: p.stats[5].base_stat,
                    height: p.height,
                    weight: p.weight
                });
            });
            // console.log(pokeData);
            return pokeData;
        })
        .catch(error => console.log(error));

        // console.log(pokemonData);
        return res.status(200).json(pokemonData);
    } catch (error) {
        next(error);;
    }
};

module.exports = {
    getApiPokemons
}