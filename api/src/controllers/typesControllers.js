const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async () => {
    try {
        let dbTypeNames;
        let typesInDb = await Type.findAll();

        if (typesInDb.length === 0) {
            // al no encontrar en la base de datos, me traigos los tipos de la API
            const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
            const apiTypesResults = apiTypes.data.results;

            let typeNames = apiTypesResults.map(t => {
                let newObj = {};
                newObj["name"] = t.name;
                return newObj;
            });

            try {
                dbTypeNames = await Type.bulkCreate(typeNames);
            } catch (err) {
                console.log("Cannot create Type", err)
            }
            return dbTypeNames;
        }
        return typesInDb;
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllTypes
}