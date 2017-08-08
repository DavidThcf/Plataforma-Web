var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('./connectionDb.js');
var router = express.Router();



module.exports.createUser = function (req, res) {
	var sequelize = sqlCon.configConnection();
	//console.log(req);
	//variables del usuario
	var email = req.body.email;
	var password = req.body.password;
	var nombre = req.body.nombre;
	var apellido = req.body.apellido;
	var genero = req.body.genero;
	var cargo = req.body.cargo;
	var telefono = req.body.telefono;
	var entidad = req.body.entidad;
	var imagen = req.body.imagen;

	//Insertar en base de datos



	var usr = {
		"password": this.password,
		"administrador": false,
		"e_mail": this.email,
		"nombre": this.nombre,
		"apellido": this.apellido,
		"genero": this.genero,
		"cargo": this.cargo,
		"telefono": this.telefono,
		"entidad": this.entidad,
		"imagen": '',
		"diponible": true
	};


	var cad = `INSERT INTO usuarios 
	("pass","e_mail","nombre","apellido","genero","cargo","telefono","entidad","imagen","disponible") 
	  VALUES (
		  	'`+ password + `',
			'`+ email + `',
			'`+ nombre + `',
			'`+ apellido + `',
			'`+ genero + `',
			'`+ cargo + `',
			'`+ telefono + `',
			'`+ entidad + `',
			'`+ imagen + `',
			false
		);`;

	//console.log("Pru\n\n\n\n\n\n  "+cad);

	return new Promise((resolve, reject) => {
		sequelize.query(cad, { type: sequelize.QueryTypes.INSERT })
			.then(x => {
				console.log('OK');
				resolve(true);
			}).catch(x => {
				console.log('Error' + x);
				reject(false);
			});
	});

	Console.log("SESION CERRADA !!!!!!!!!!!!!!!!!!!!!!!!!!");
};





/*
////////// 			Otros ejemplos de servicios







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
	sequelize.query(cad, {
		type: sequelize.QueryTypes.SELECT
	})
		.then(proyectos => {
			var obj = JSON.stringify(proyectos).replace(/\[/g, "").replace(/\]/g, "");
			res.header("Access-Control-Allow-Origin", "*");
			res.send(proyectos);
		})
});



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





*/