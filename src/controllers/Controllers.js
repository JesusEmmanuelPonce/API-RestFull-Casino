const Usuario = require('../models/Usuarios');
const Preguntas = require('../models/Preguntas');
const Apuestas = require('../models/Apuestas');

exports.Home = (req, res) => {
	res.send('Home');
};

//Insertar Usuarios
exports.Usuario = async (req, res) => {
	try {
		const {
			name,
			nick,
			secretQuestion,
			secretAnswer
		} = req.body;
		const usuarios = await Usuario.create({
			name,
			nick,
			secretQuestion,
			secretAnswer
		});
		res.json({
			msg: 'Usuario insertado'
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};

//Ver todos los usuarios
exports.VerUsuario = async (req, res) => {
	try {
		const usuarios = await Usuario.findAll({
			order: [
				['name', 'asc']
			]
		});
		res.json({
			usuarios
		});
	} catch (e) {
		console.log(e);
	}
};

//Verificar si el usuario existe
exports.Alias = async (req, res) => {
	const alias = await Usuario.findOne({
		where: {
			name: req.params.name
		}
	});

	if (alias) {
		console.log('EXISTE');
	} else {
		console.log('NO EXISTE');
	}
};

//Preguntas Activas
exports.PreguntasActivas = async (req, res) => {
	try {
		const preguntasActivas = await Preguntas.findAll();
		res.json({
			preguntasActivas
		});
	} catch (e) {
		console.log(e);
	}
};

// Preguntas Desactivas
exports.PreguntasDesactivas = async (req, res) => {
	try {
		const preguntasDesactivas = await Preguntas.findAll({
			where: {
				questionStatus: 1
			}
		});
		res.json({
			preguntasDesactivas
		});
	} catch (e) {
		console.log(e);
	}
};

//Preguntas Finalizadas
exports.PreguntasFinal = async (req, res) => {
	try {
		const preguntasFinalizadas = await Preguntas.findAll({
			where: {
				questionStatus: 2
			}
		});
		res.json({
			preguntasFinalizadas
		});
	} catch (e) {
		console.log(e);
	}
};

//Ver status pregunta
exports.EditarStatusPregunta = async (req, res) => {
	const {
		questionStatus,
		correctAnswer,
		id_question
	} = req.body;
	try {
		const statusId = await Preguntas.update({
			questionStatus: questionStatus,
			correctAnswer: correctAnswer
		}, {
			where: {
				id_question: id_question
			}
		});
		res.json({
			msg: 'Actualizado'
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};

//Insertar Apuesta
exports.InsertApuesta = async (req, res) => {
	const {
		chosenOption,
		isGift,
		amount,
		betTime,
		giftTime,
		usuarioIdUser,
		preguntaIdQuestion
	} = req.body;
	try {
		let fecha = new Date();

		let h = fecha.getHours();
		let m = fecha.getMinutes();
		let s = fecha.getSeconds();

		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		if (m < 10) {
			s = '0' + s;
		}

		let time = h + ':' + m + ':' + s;

		const apuesta = await Apuestas.create({
			chosenOption: chosenOption,
			isGift: isGift,
			amount: amount,
			betTime: time,
			giftTime: giftTime,
			usuarioIdUser: usuarioIdUser,
			preguntaIdQuestion: preguntaIdQuestion
		});
		res.json({
			msg: 'Apuesta insertada'
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};

//Consultar Apuestas con Usuario
exports.ApuestasUsuarios = async (req, res) => {
	try {
		const apuestas = await Apuestas.findAll({
			include: [{
					model: Usuario,
					attributes: ['id_user', 'nick']
				},
				{
					model: Preguntas,
					attributes: ['id_question', 'correctAnswer', 'questionStatus']
					// where: {
					// 	id_question: id_question
					// }
				}
			],

			attributes: ['id_bets', 'amount', 'chosenOption']
		});

		// {const arrayBets = JSON.stringify(apuestas);
		// console.log("Prueba: ", apuestas[0].pregunta.correctAnswer);

		// // res.send(apuestas)
		// res.send({
		// 	correctAnswer: apuestas[0].pregunta.correctAnswer
		// });

		// console.log(typeof arrayBets);}

		res.json({
			apuestas
		});
	} catch (e) {
		console.log(e);
	}
};

//Consultar ultimo ID de apuestas
exports.ConsultaIdApuesta = async (req, res) => {
	try {
		const cosultarIdApuesta = await Apuestas.findAll({
			limit: 1,
			order: [
				['id_bets', 'desc']
			],
			attributes: ['id_bets']
		});
		res.json({
			cosultarIdApuesta
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};

//Consultar ultimo ID de usuarios
exports.ConsultaIdUsuario = async (req, res) => {
	try {
		const cosultarIdUsuario = await Usuario.findAll({
			limit: 1,
			order: [
				['id_user', 'desc']
			],
			attributes: ['id_user']
		});
		res.json({
			cosultarIdUsuario
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};

//Comparar chosenOption con correctAnswer
exports.Comparar = async (req, res) => {
	const {
		id_question
	} = req.body;
	try {
		const comparar = await Apuestas.findAll({
			attributes: ['id_bets', 'amount', 'isGift', 'betTime', 'giftTime'],

			include: [{
					model: Usuario,
					attributes: ['id_user', 'name', 'nick']
				},
				{
					model: Preguntas,
					attributes: ['id_question'],
					where: {
						id_question: id_question
					}
				}
			]
		});

		let resultado = [];

		for (i = 0; i < comparar.length; i++) {
			if (comparar[i].chosenOption == comparar[i].pregunta.correctAnswer) {
				resultado[i] = comparar[i];
			}
		}

		res.json({
			resultado
		})

	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};

exports.ConsultaUP = async (req, res) => {
	const {
		id_question
	} = req.body;
	try {
		const usuarioPreguntas = await Apuestas.findAll({
			include: [{
					model: Usuario,
					attributes: ['id_user', 'name', 'nick']
				},
				{
					model: Preguntas,
					attributes: ['id_question', 'correctAnswer'],
					where: {
						id_question: id_question
					}
				}
			],

			attributes: ['id_bets', 'amount', 'chosenOption']
		});

		res.json({
			usuarioPreguntas
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error '
		});
	}
};

exports.Reclamar = async (req, res) => {
	const {
		id_bets,
		isGift
	} = req.body;
	try {
		let fecha = new Date();

		let h = fecha.getHours();
		let m = fecha.getMinutes();
		let s = fecha.getSeconds();

		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		if (m < 10) {
			s = '0' + s;
		}

		let time = h + ':' + m + ':' + s;

		const cambiarFecha = await Apuestas.update({
			giftTime: time,
			isGift: isGift
		}, {
			where: {
				id_bets: id_bets
			}
		});
		res.json({
			msg: 'Actualizado'
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error en el servidor'
		});
	}
};