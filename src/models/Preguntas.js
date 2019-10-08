const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuarios = require('./Usuarios');
const Apuestas = require('./Apuestas');

const Preguntas = db.define('preguntas', {
    id_question:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    question: {
        type: Sequelize.STRING
    },

    aOption: {
        type: Sequelize.STRING
    },

    bOption: {
        type: Sequelize.STRING
    },

    cOption: {
        type: Sequelize.STRING
    },

    correctAnswer: {
        type: Sequelize.INTEGER
    },

    questionStatus:{
        type:  Sequelize.INTEGER
    }
});

Usuarios.hasMany(Apuestas);
Apuestas.belongsTo(Usuarios);
Preguntas.hasMany(Apuestas);
Apuestas.belongsTo(Preguntas);

/*Apuestas.hasMany(Usuarios);
Preguntas.hasMany(Apuestas);*/


module.exports = Preguntas;