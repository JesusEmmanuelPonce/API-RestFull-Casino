const Sequelize = require('sequelize');
const db = require('../config/db');

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

module.exports = Apuestas;