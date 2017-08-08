var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('./connectionDb.js');
var router = express.Router();

var Caracteristica = require('./Caracteristicas');




module.exports.createActivity = function (req, res) {
	//console.log(req);
	//variables del usuario
	//==> Informacion de la actividad
	var keym = req.body.keym;
	var id_usuario = req.body.id_usuario_act;
	var id_actividad = 95;

	var nombre = req.body.nombre;
	var descripcion = req.body.descripcion;
	var pos = req.body.pos;
	var folder = req.body.folder;


	return new Promise((resolve, reject) => {
		var sequelize = sqlCon.configConnection();
		var car = Caracteristica.createCharacteristic(req, 'A');

		car.then(x => {

			var keym_car = x.keym;
			var id_caracteristica_car = x.id_caracteristica;
			var id_usuario_car = x.id_usuario;
			var fecha_ultima_modificacion = x.fecha_ultima_modificacion;

			id_actividad = req.body.id_actividad;



			var query1 = `
				insert into actividades values(

					`+ keym_car + `,
					`+ id_actividad + `,
					`+ id_usuario + `,
					
					`+ keym_car + `,
					`+ id_usuario_car + `,
					`+ id_caracteristica_car + `,
					
					'`+ nombre + `',
					'`+ descripcion + `',
					`+ pos + `,
					`+ folder + `,
					'`+ fecha_ultima_modificacion + `'

				);
			`;
			sequelize.query(query1, { type: sequelize.QueryTypes.INSERT })
				.then(x => {
					resolve(true);
				}).catch(x => {
					console.log('Error al registrar actividad ' + x);
					reject(false);
				}).done(x => {
					sequelize.close();
					console.log('Se ha cerrado sesion de la conexion a la base de datos');
				});

		}).catch(x => {
			console.log('Error registrar Caracteristica ' + x);
			reject(false);
		});
	});

	//Informacion del padre de la actividad (Caracteristica)

}
