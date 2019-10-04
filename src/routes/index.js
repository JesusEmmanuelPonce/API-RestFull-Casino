const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controllers');

module.exports = function(){

    //Principal
    router.get('/', controllers.Home);

    //Insertar Usuarios
    router.post('/add-user', controllers.Usuario);

    //Ver Usuarios
    router.get('/users', controllers.VerUsuario);

    //Verificar si existe un usuario
    router.get('/nick-available/:name', controllers.Alias);

    //Ver Preguntas Activas
    router.get('/questions/actives', controllers.PreguntasActivas);

    //Ver Preguntas Desactivadas
    router.get('/questions/deactivated', controllers.PreguntasDesactivas);

    //Ver Preguntas Finalizadas
    router.get('/questions/end', controllers.PreguntasFinal);

    //Editar Status
    router.post('/questions/:id',controllers.EditarStatusPregunta);

    return router;
}
