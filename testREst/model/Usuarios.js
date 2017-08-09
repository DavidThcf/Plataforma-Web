var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();



module.exports.createUser = function (data,files) {
	var sequelize = sqlCon.configConnection();
	//var data = JSON.parse(req.body.json);
	//console.log('POL  =>  ' + JSON.stringify(data));
	fileupload(files);

	//variables del usuario
	var email = data.email;
	email.replace(/ /g, "");
	var password = data.password;
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
		);`;

	//Verificar que no se repite el correo electronico
	return new Promise((resolve, reject) => {
		var sql = sqlCon.configConnection();
		var query1 = `
			select exists(select e_mail from usuarios where usuarios.e_mail like '`+ email + `') res;
		`;
		sql.query(query1, { type: sequelize.QueryTypes.SELECT })
			.then(x => {
				console.log('POLSAS'+x[0].res);
				if (x[0].res === true) {
					console.log('\n\n\n\nEl correo electronico ya existe, intente con otro.  \n\n\n\n');
					reject('err-mail');
				}
				else if (x[0].res === false){
					new Promise(() => {
						var sequelize = sqlCon.configConnection();
						sequelize.query(cad, { type: sequelize.QueryTypes.INSERT })
							.then(y => {
								console.log('Se ha creado satisfactoriamente el usuario');
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
				sequelize.close();
			});
	});






};



function fileupload(files){

	console.log(files)
	var file;

	var result='-1';

	if(!files){
		result='0';
		console.log("no existe archivo");
	}
	else{
		file=files.file;
		
		var fina = file.name.replace(/\s/g, "");
		file.mv('files/'+fina,function(err){
			if(err) console.log("error " + err.toString());
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