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

					` + keym_car + `,
					` + id_actividad + `,
					` + id_usuario + `,
					
					` + keym_car + `,
					` + id_usuario_car + `,
					` + id_caracteristica_car + `,
					
					'` + nombre + `',
					'` + descripcion + `',
					` + pos + `,
					` + folder + `,
					'` + fecha_ultima_modificacion + `'

				);
			`;
			sequelize.query(query1, {
				type: sequelize.QueryTypes.INSERT
			})
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
var jsn;
module.exports.getActivityList = function (data) {
	jsn = [];
	//variables del usuario
	//==> Informacion de la actividad
	var keym = data.keym;
	var id_usuario = data.id_usuario;
	var id_caracteristica = data.id_caracteristica;

	return new Promise((resolve, reject) => {
		var sequelize = sqlCon.configConnection();
		var query1 = `
				select 
								a.nombre as nom_act,
				a.descripcion as desc_act,
				a.folder,
				a.pos,

				c.keym,
				c.id_caracteristica,
				c.id_usuario,

				c.keym_padre,
				c.id_caracteristica_padre,
				c.id_usuario_padre,

				c.estado,
				c.porcentaje_asignado,
				c.porcentaje_cumplido,
				c.publicacion_web,
				c.porcentaje,
				c.fecha_inicio,
				c.fecha_fin,
				c.publicacion_reporte,

				u.nombre as usr_nom,
				u.apellido as usr_ape

				from actividades a join caracteristicas c
 				on 	a.keym_car = c.keym
				and 	a.id_usuario_car = c.id_usuario
				and 	a.id_caracteristica = c.id_caracteristica
				join usuarios u
				on c.usuario_asignado=u.id_usuario

				where c.keym_padre = ` + keym + ` 
				and c.id_caracteristica_padre = ` + id_caracteristica + ` 
				and c.id_usuario_padre = ` + id_usuario + ` 
				
				order by a.pos; `;

		var i = 0;
		console.log('POLSA');
		sequelize.query(query1, {
			type: sequelize.QueryTypes.SELECT
		})
			.then(x => {

				if (x.length > 0) {
					x.forEach(function (element) {
						i++;
						getRecursiveActivity(element.keym,
							element.id_caracteristica,
							element.id_usuario,
							sequelize,
							element,
							i
						).then(y => {
							//console.log('\nI=>  ' + y[0]);
							//console.log('\nBefore   ' + JSON.stringify(y));
							element.actividades = y[1];
							jsn.push(element);
							//console.log('\n\n'+i);
							if (y[0] === x.length) {
								//console.log('\n\n\n\n\n\nPOL' + JSON.stringify(x[2]) + '\n\n\n');
								resolve(jsn);
							}
						}).catch(x => {
							reject(false);
						});

					});
				}
				else
					reject(false);

			}).catch(x => {
				console.log('Error al registrar actividad ' + x);
				reject(false);
			}).done(x => {
				sequelize.close();
				console.log('Se ha cerrado sesion de la conexion a la base de datos');
			});

	});
}

function getRecursiveActivity(keym, car, usu, sequelize, element, i) {
	var query1 = `
				select 
				
				a.nombre as nom_act,
				a.descripcion as desc_act,
				a.folder,
				a.pos,
				

				c.keym,
				c.id_caracteristica,
				c.id_usuario,

				c.keym_padre,
				c.id_caracteristica_padre,
				c.id_usuario_padre,

				c.estado,
				c.porcentaje_asignado,
				c.porcentaje_cumplido,
				c.publicacion_web,
				c.porcentaje,
				c.fecha_inicio,
				c.fecha_fin,
				c.publicacion_reporte,

				u.nombre as usr_nom,
				u.apellido as usr_ape

				from actividades a join caracteristicas c
 				on 	a.keym_car = c.keym
				and 	a.id_usuario_car = c.id_usuario
				and 	a.id_caracteristica = c.id_caracteristica
				join usuarios u
				on c.usuario_asignado=u.id_usuario

				where c.keym_padre = ` + keym + ` 
				and c.id_caracteristica_padre = ` + car + ` 
				and c.id_usuario_padre = ` + usu + ` 
				
				order by a.pos ;`;
	return new Promise((res, rej) => {
		sequelize.query(query1, {
			type: sequelize.QueryTypes.SELECT
		})
			.then(x => {
				var rt = [i, x];

				res(rt);
			}).catch(x => {
				rej(false);
			});
	});

}






function forEachAll(data, each, finish, sync) {
	var n = -1,
		result = [];
	var next = sync ?
		function () {
			if (++n < data.length) {
				each(data[n], result, next);
			} else if (finish) {
				finish(result);
			}
		} :
		(function () {
			function completed() {
				if (++n <= data.length && finish) {
					finish(result);
				}
			}
			for (var i = 0; i < data.length; i++) {
				each(data[i], result, completed);
			}
			return completed;
		}());
	next();
}

function asyncSqrt(value, callback) {
	console.log('START execution with value =', value);
	setTimeout(function () {
		callback(value, value * value);
	}, 0 | Math.random() * 100);
}

/*
forEachAll([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	function (value, allresult, next) {
		asyncSqrt(value, function (value, result) {
			console.log('END execution with value =', value, 'and result =', result);
			allresult.push({ value: value, result: result });
			next();
		});

	},
	function (allresult) {
		console.log('COMPLETED');
		console.log(allresult);
	},
	true


);*/

