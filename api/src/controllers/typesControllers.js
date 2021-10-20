const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async () => {
    try {
        let dbTypeNames;

        let typesInDb = await Type.findAll();

        if (typesInDb.length === 0) {
            // me traigos los tipos de la API
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
    // try {
    //     const dbTypes = await Type.findAll({
    //         attributes: ['name']
    //     });
    //     if(dbTypes.length === 0){
    //         const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
    //         let createdTypes = apiTypes.data.results.map(async type => await Type.create({name: type.name}));  //me guardo los types en DB
    //         createdTypes = await axios.all(createdTypes);
    //         console.log(createdTypes);
    //         const getApiTypes = getTypes(createdTypes);
    //         return getApiTypes;
    //     }else{
    //         const getDbTypes = getTypes(dbTypes);
    //         console.log(getDbTypes);
    //         return getDbTypes;
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return error;
    // }
};

// const getTypes = (array) => {
//     let types = array.map( type => type.name);
//     return types;
// }

module.exports = {
    getAllTypes
}