const Usuario = require('../models/Usuarios');
const Preguntas = require('../models/Preguntas');

exports.Home = (req, res) => {
    res.send('Home');
}

//Usuarios
exports.Usuario = async (req,res) => {
    const { nombre, alias, respuesta } = req.body;
    const usuarios = await Usuario.create({
        nombre,
        alias,
        respuesta
    });

    res.send('Usuario Recibido');
}

exports.Preguntas = async (req,res) => {
    const preguntas = await Preguntas.findAll({
        attributes:['pregunta'],
        where: {
            status : 1
        }
    });
    res.send(preguntas);
}