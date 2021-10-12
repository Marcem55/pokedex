const axios = require('axios');
const { Type } = require('../../db');

const getTypes = async (req, res) => {
    const dbTypes = await Type.findAll({
        attributes: ['name']
    });
    if(dbTypes.length === 0) {
        try {
            const types = await axios.get('https://pokeapi.co/api/v2/type');
            const totalTypes = types.data.results.map(el=> el.name)
            const createTypes = totalTypes.map(async el=> await Type.create({name: el}))
            return res.status(200).send(createTypes);
        } catch (error) {
            res.status(404).json({error: 'Types not found'});
        }
    } else {
        const types = await Type.findAll();
        const totalTypes = types.map(el=> el.name);
        return res.status(200).send(totalTypes);
      }
}

module.exports = {
    getTypes
}