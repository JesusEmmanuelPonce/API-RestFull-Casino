const Sequelize = require('sequelize');
const db = require('../config/db');

export const Apuestas = db.define('apuestas', {
    id_apuestas: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement:true
    },
    respuesta: Sequelize.STRING,
    resultado: Sequelize.STRING,
    cantidad:  Sequelize.INTEGER,
    cantidad_total: Sequelize.INTEGER
})