const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('countries', {
    id: {
      type: DataTypes.STRING(3), // (UUID) numero randon unico
      allowNull: false, // te permito que este vacio, es un campo requerido
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continents: {
      type: DataTypes.STRING,
      allowNull: false
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },

    subregion: {
      type: DataTypes.STRING,
    },

    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING
    },
    borders: {
      type: DataTypes.STRING,
      allowNull: false
     
    },
    fifa: {
      type: DataTypes.STRING,
      allowNull: true
    },
  } , {
    timestamps: false
  });
};