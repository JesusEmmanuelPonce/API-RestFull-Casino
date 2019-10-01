const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuarios = require('./Usuarios');

const Preguntas = db.define('preguntas', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    pregunta: {
        type: Sequelize.STRING
    },

    a_pregunta: {
        type: Sequelize.STRING
    },

    b_pregunta: {
        type: Sequelize.STRING,
    },

    c_pregunta: {
        type: Sequelize.STRING,
    },

    correcta: {
        type: Sequelize.STRING,
    },

    status:{
        type:  Sequelize.INTEGER
    }
});

Preguntas.hasMany(Usuarios, {foreingKey: 'id_pregunta', sourceKey: 'id'});
Usuarios.belongsTo(Preguntas, {foreingKey: 'id_pregunta', sourceKey: 'id'});

module.exports = Preguntas;