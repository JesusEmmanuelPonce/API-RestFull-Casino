const Usuario = require('../models/Usuarios');
const Preguntas = require('../models/Preguntas');
const Apuestas = require('../models/Apuestas');

exports.Home = (req, res) => {
    res.send('Home');
}

//Insertar Usuarios
exports.Usuario = async (req,res) => {
    try{
    const { name, nick, secretAnswer} = req.body;
    const usuarios = await Usuario.create({
        name,
        nick,
        secretAnswer
    });
    res.send('Usuario Recibido');
}catch(e){console.log(e)}
}

//Ver todos los usuarios
exports.VerUsuario = async (req,res) => {
    try{
    const usuarios = await Usuario.findAll({
        order:[[ 'name', 'asc' ]]
    });
    res.json({usuarios});
}catch(e){console.log(e)}
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
    try{
    const preguntasActivas = await Preguntas.findAll({
        where:{ questionStatus: 0 }
    });
    res.json({preguntasActivas});
}catch(e){console.log(e)}
}

// Preguntas Desactivas
exports.PreguntasDesactivas = async (req, res) => {
    try{
    const preguntasDesactivas = await Preguntas.findAll({
        where:{ questionStatus: 1 }
    });
    res.json({preguntasDesactivas});
}catch(e){console.log(e)};
}

//Preguntas Finalizadas
exports.PreguntasFinal = async (req, res) => {
    try{
    const preguntasFinalizadas = await Preguntas.findAll({
        where:{ questionStatus: 2 }
    });
    res.json({preguntasFinalizadas});
}catch(e){console.log(e)}
}

//Ver status pregunta
exports.EditarStatusPregunta = async(req, res) => {
    const { questionStatus } = req.body;
    try{
    const statusId = await Preguntas.update({
         questionStatus:questionStatus
    },{
        where: {id_question:req.params.id}
    });
    res.send(statusId);
}catch(e){console.log(e)}
}

//Insertar Apuesta
exports.InsertApuesta = async(req,res) =>{
    const { chosenOption, isGift, amount, betTime, giftTime, usuarioIdUser, preguntaIdQuestion} = req.body;
    try{
    const apuesta = await Apuestas.create({
        chosenOption,
        isGift,
        amount,
        betTime,
        giftTime,
        usuarioIdUser,
        preguntaIdQuestion
    });
    res.send('Apuesta Recibido');
}catch(e){ console.log(e)}
}

//Consultar Apuestas con Usuario
exports.ApuestasUsuarios = async(req, res) => {
   try{
    const apuestas = await Apuestas.findAll({
        include:[{
            model: Usuario
        },
        {
            model: Preguntas
        }
     ]
    })
     res.json({apuestas});
   }catch(e){
    console.log(e);
   }
}
