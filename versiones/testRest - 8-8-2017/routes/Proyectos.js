var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('./connectionDb.js');
var sequelize = sqlCon.configConnection();
var router = express.Router();
var Caracteristica = require('./Caracteristicas');

module.exports.createProject = function (req, res) {

    var keym = req.body.keym;
    var id_proyecto = 0;
    var id_usuario = req.body.id_usuario_act;

    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var icon = req.body.icon;


    return new Promise((resolve, reject) => {
        Caracteristica.createCharacteristic(req, 'P').
            then(x => {

                var keym_car = x.keym;
                var id_caracteristica_car = x.id_caracteristica;
                var id_usuario_car = x.id_usuario;
                var fecha_ultima_modificacion = x.fecha_ultima_modificacion;

                id_proyecto = req.body.id_proyecto;

                var query1 = `
                insert into proyecctos values (
                    `+ keym + `,
                    `+ id_proyecto + `,
                    `+ id_usuario + `,

                    `+ keym_car + `,
                    `+id_usuario_car+`,
                    `+id_caracteristica_car+`,
                    
                    '`+nombre+`',
                    '',
                    `+false+`,
                    '`+icon+`',
                    '`+descripcion+`',
                    `+0+`,
                    `+fecha_ultima_modificacion+`
                );
            `;

            sequelize.query(query1, { type: sequelize.QueryTypes.INSERT })
				.then(x => {
					console.log("OKI PRJ  "+x);
					resolve(true);
				}).catch(x => {
					console.log('Error al registrar actividad ' + x);
					reject(false);
                });
                
            }).
            catch(x => {
console.log('Error registrar Caracteristica ' + x);
			reject(false);
            });
    });

};