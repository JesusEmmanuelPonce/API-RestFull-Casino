const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuarios = require('./Usuarios');
const Preguntas = require('./Preguntas');

const Apuestas = db.define('apuestas', {
    id_bets: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    chosenOption:{
        type: Sequelize.INTEGER
    },

    isGift:{
        type: Sequelize.BOOLEAN
    },

    amount: {
        type: Sequelize.INTEGER
    },

    betTime:{
        type: Sequelize.DATE
    },

    giftTime:{
        type: Sequelize.DATE
    }
});

// Usuarios.hasMany(Apuestas);

// Apuestas.associate = (models) => {
//     Apuestas.belongsTo(models.Usuarios);//hasMany depending on your relationship
// };

module.exports = Apuestas;