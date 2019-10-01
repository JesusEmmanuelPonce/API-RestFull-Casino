const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controllers');

module.exports = function(){

    //Principal
    router.get('/', controllers.Home);

    //Insertar usuarios
    router.post('/usuarios', controllers.Usuario);

    //Ver Preguntas
    router.get('/preguntas', controllers.Preguntas);

    return router;
}
