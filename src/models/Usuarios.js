const Sequelize = require('sequelize');
const db = require('../config/db');

const Usuarios = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: Sequelize.STRING,
    },

    alias: {
        type: Sequelize.STRING,
    },

    respuesta: {
        type: Sequelize.STRING,
    }

});

module.exports = Usuarios;