var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var fs = require('fs');

var repository = 'files/';

module.exports.createUser = function (data, files) {
	//var data = JSON.parse(req.body.json);
	//console.log('POL  =>  ' + JSON.stringify(data));

	console.log('data=>   ' + JSON.stringify(data) + ' USU ' + data.nombre);
	//variables del usuario
	var email = data.e_mail;
	email.replace(/ /g, "");
	var password = data.pass;
	var nombre = data.nombre;
	var apellido = data.apellido;
	var genero = data.genero;
	var cargo = data.cargo;
	var telefono = data.telefono;
	var entidad = data.entidad;
	var imagen = data.imagen;

	//Query Insertar en base de datos
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
		);

		select id_usuario from usuarios where e_mail like '`+ email + `' limit 1
		`;

	//Verificar que no se repite el correo electronico
	return new Promise((resolve, reject) => {
		var sql = sqlCon.configConnection();
		var query1 = `
			select exists(select e_mail from usuarios where usuarios.e_mail like '`+ email + `') res;
		`;
		sql.query(query1, { type: sql.QueryTypes.INSERT })
			.then(x => {
				if (x[0][0].res == true) {
					console.log('\n\n\n\nEl correo electronico ya existe, intente con otro.  \n\n\n\n');
					reject('err-mail');
				}
				else if (x[0][0].res == false) {
					new Promise((rsl, rjt) => {
						var sequelize = sqlCon.configConnection();
						sequelize.query(cad, { type: sequelize.QueryTypes.INSERT })
							.then(y => {
								var path = repository + 'user' + y[0][0].id_usuario;
								fs.mkdir(path);

								fileupload(files, path + '/');

								resolve(true);
							}).catch(y => {
								console.log('Error' + y);
								reject(false);
							}).done(y => {
								sequelize.close();
								console.log('Se ha cerrado sesion de la conexion a la base de datos')
							});
					});
				}
			}).catch(x => {
				console.log('Correo electronico invalido');
				reject(false);
			}).done(x => {
				console.log('Se ha cerrado sesion de la conexion a la base de datos')
				sql.close();
			});
	});






};

module.exports.sigIn = function (data) {
	var sequelize = sqlCon.configConnection();
	var query1 = `
		select id_usuario,  e_mail, nombre, apellido, genero, cargo, telefono, entidad, imagen from usuarios 
		where e_mail like '`+ data.e_mail + `' and pass like '` + data.pass + `' limit 1;
	`;
	return new Promise((resolve, reject) => {
		sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
			.then(x => {
				console.log('\n\n\n x==>'+ JSON.stringify(x));
				if (x[0] != null) {
					console.log('ok');
					resolve(x);
				}
				else {
					console.log('bad');
					reject(false);
				}
			}).catch(x => {
				console.log('Error Usuario: ' + x);
				reject(false);
			}).done(x => {
				sequelize.close();
				console.log('Se ha cerrado sesion de la conexion a la base de datos');
			});

	});

}

function fileupload(files, path) {

	var file;

	var result = '-1';

	if (!files) {
		result = '0';
		console.log("no existe archivo");
	}
	else {
		file = files.file;

		//var fina = file.name.replace(/\s/g, "");
		var fina = file.name = 'profile.jpg';

		file.mv(path + fina, function (err) {
			if (err) console.log("error " + err.toString());
			else console.log("carga exitosa");
		});

	}
}
















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
	var email = data.email;
	var password = data.password;
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