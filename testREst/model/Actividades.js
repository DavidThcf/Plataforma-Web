var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var Caracteristica = require('./Caracteristicas');

module.exports.createActivity = function (data) {
	//console.log(req);
	//variables del usuario
	//==> Informacion de la actividad
	var keym = data.keym;
	var id_usuario = data.id_usuario_act;
	var id_actividad = 95;

	var nombre = data.nombre;
	var descripcion = data.descripcion;
	var pos = data.pos;
	var folder = data.folder;


	return new Promise((resolve, reject) => {
		var sequelize = sqlCon.configConnection();
		var car = Caracteristica.createCharacteristic(data, 'A');

		car.then(x => {

			var keym_car = x.keym;
			var id_caracteristica_car = x.id_caracteristica;
			var id_usuario_car = x.id_usuario;
			var fecha_ultima_modificacion = x.fecha_ultima_modificacion;

			id_actividad = data.id_actividad;

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


}

module.exports.getActivityList = function (data) {
	//variables del usuario
	//==> Informacion de la actividad
	var keym = data.keym;
	var id_usuario = data.id_usuario;
	var id_caracteristica = data.id_caracteristica;

	return new Promise((resolve, reject) => {
		var sequelize = sqlCon.configConnection();
		var query1 = `
				select * from actividades a join caracteristicas c
 				on 	a.keym_car = c.keym
				and 	a.id_usuario_car = c.id_usuario
				and 	a.id_caracteristica = c.id_caracteristica
				where c.keym_padre = `+ keym + ` 
				and c.id_caracteristica_padre = `+ id_caracteristica + ` 
				and c.id_usuario_padre = `+ id_usuario + ` ; `;
		
		sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
			.then(x => {

				x.forEach(function (element) {
					getRecursiveActivity(element.keym,
						element.id_caracteristica,
						element.id_usuario,
						sequelize).then( y =>{
							if(Object.keys(y).length > 0){
								console.log('\nBefore'+JSON.stringify(element));
								element.actividades = y;
								console.log('\nAfter'+JSON.stringify(element));
							}
								
						}).catch(y =>{

						});
				}, this);
				console.log('\n\n\n\nXXX'+JSON.stringify(x));
				resolve(x);
			}).catch(x => {
				console.log('Error al registrar actividad ' + x);
				reject(false);
			}).done(x => {
				sequelize.close();
				console.log('Se ha cerrado sesion de la conexion a la base de datos');
			});

	});
}

function getRecursiveActivity(keym, car, usu, sequelize) {
	var query1 = `
				select * from actividades a join caracteristicas c
 				on 	a.keym_car = c.keym
				and 	a.id_usuario_car = c.id_usuario
				and 	a.id_caracteristica = c.id_caracteristica
				where c.keym_padre = `+ keym + ` 
				and c.id_caracteristica_padre = `+ car + ` 
				and c.id_usuario_padre = `+ usu + ` ; `;
	return new Promise((resolve, reject) => {
		sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
			.then(x => {
				resolve(x);

			}).catch(x => {
				reject(false);
			});
	});

}