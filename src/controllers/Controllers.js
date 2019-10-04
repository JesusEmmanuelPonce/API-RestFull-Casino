const Usuario = require('../models/Usuarios');
const Preguntas = require('../models/Preguntas');

exports.Home = (req, res) => {
    res.send('Home');
}

//Insertar Usuarios
exports.Usuario = async (req,res) => {
    const { name, nick, secretAnswer} = req.body;
    const usuarios = await Usuario.create({
        name,
        nick,
        secretAnswer
    });
    res.send('Usuario Recibido');
}

//Ver todos los usuarios
exports.VerUsuario = async (req,res) => {
    const usuarios = await Usuario.findAll({
        order:[[
            'name', 'asc'
        ]]
    });

    res.json({usuarios});
}

//Verificar si el usuario existe
exports.Alias = async (req, res) => {

    const alias = await Usuario.findOne({
         where:{
            name: req.params.name
        }
     });

     if (alias) {
        console.log("EXISTE");
     } else {
        console.log("NO EXISTE");
     }
}

//Preguntas Activas
exports.PreguntasActivas = async (req,res) => {
    const preguntasActivas = await Preguntas.findAll({
        where:{
            questionStatus: 0
        }
    });

    res.json({preguntasActivas});
}

// Preguntas Desactivas
exports.PreguntasDesactivas = async (req, res) => {
    const preguntasDesactivas = await Preguntas.findAll({
        where:{
            questionStatus: 1
        }
    });

    res.json({preguntasDesactivas});
}

//Preguntas Finalizadas
exports.PreguntasFinal = async (req, res) => {
    const preguntasFinalizadas = await Preguntas.findAll({
        where:{
            questionStatus: 2
        }
    });

    res.json({preguntasFinalizadas});
}

//Ver status pregunta
exports.EditarStatusPregunta = async(req, res) => {

    const { questionStatus } = req.body;

    //console.log(questionStatus);

    const statusId = await Preguntas.update({

        questionStatus:questionStatus
    },{
        where: {id_question:req.params.id}
    })

    res.send(statusId);
}
