const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    dificultad: {
        type:DataTypes.INTEGER,
         allowNull: false,
         validate: {
          min: 1,
          max: 12,
          isEven(value) {
            if(value < 1 || value > 12) {
              throw new Error('Solo valores entre 1 y 12!')
            }
          }
        }
      },
      
       duracion: {
          type: DataTypes.STRING,
          allowNull: false,
        
      },
    temporada: {
      type: DataTypes.ENUM ('Verano', 'Otoño', 'Invierno', 'Primavera'),
        allowNull: false,
      },
    
    } , {
      timestamps: false
  });
};