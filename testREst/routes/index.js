var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
var sqlCon = require('./connectionDb.js');
var sequelize = sqlCon.configConnection();


//Constantes del modelo
const Proyecto = sequelize.import('../models/proyectos');
const Caracteristica = sequelize.import('../models/caracteristicas');
const Usuario = sequelize.import('../models/usuarios.js');



//servicios

router.get('/:email/:password', function (req, res, next) {
	Usuario.findAll({
		where: {
			e_mail: req.params.email,
			pass: req.params.password
		}
	}).then(heroe => {
		var obj = JSON.stringify(heroe).replace(/\[/g, "").replace(/\]/g, "");
		res.header("Access-Control-Allow-Origin", "*");
		res.send(obj);
	});
});


router.get('/:id_usuario', function (req, res, next) {
	var cad = "select * from proyectos join caracteristicas on proyectos.keym_car = caracteristicas.keym and proyectos.id_usuario_car = caracteristicas.id_usuario and proyectos.id_caracteristica = caracteristicas.id_caracteristica  where caracteristicas.id_usuario =" + req.params.id_usuario;
	sequelize.query(cad, { type: sequelize.QueryTypes.SELECT })
		.then(proyectos => {
			var obj = JSON.stringify(proyectos).replace(/\[/g, "").replace(/\]/g, "");
			res.header("Access-Control-Allow-Origin", "*");
			res.send(proyectos);
		})
});



/* GET home page. */
//aqui haces url limpia con el /: variable
/*
router.post('/:email/:password', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send("hola: "+req.params.email + " " +req.params.password )
});
*/

router.post('/', function (req, res, next) {
	console.log(req);
	var email = req.body.email;
	var password = req.body.password;
	console.log(email + '  ' + password);
	var usuario = [{
		"email": email,
		"password": password,
		"nombre": 'Luis',
		"apellido": 'Perez'
	}];

	res.header("Access-Control-Allow-Origin", "*");
	res.send(JSON.stringify(usuario));
});

router.post('/createUser', function (req, res, next) {
	console.log(req);
	var email = req.body.email;
	var password = req.body.password;
	console.log(email + '  ' + password);
	var usuario = [{
		"email": email,
		"password": password,
		"nombre": 'Luis',
		"apellido": 'Perez'
	}];

	res.header("Access-Control-Allow-Origin", "*");
	res.send(JSON.stringify(usuario));
});







module.exports = router;
