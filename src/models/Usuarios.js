const Sequelize = require('sequelize');
const db = require('../config/db');

const Usuarios = db.define('usuarios',{
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING
    },

    nick: {
        type: Sequelize.STRING
    },

    secretQuestionId:{
        type: Sequelize.INTEGER
    },

    secretAnswer: {
        type: Sequelize.STRING
    }

});


module.exports = Usuarios;