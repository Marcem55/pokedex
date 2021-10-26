const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.TEXT,
      validate: { isUrl: true},
      // defaultValue: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1567790451l/50866301._SX318_SY475_.jpg'
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDZa4Qlw_qHWkOdJJ9g9f-xVI0ZceTX0LF-Q&usqp=CAU'
    },
    life: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
};
