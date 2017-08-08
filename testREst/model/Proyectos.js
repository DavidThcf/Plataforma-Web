var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');

var router = express.Router();
var Caracteristica = require('./Caracteristicas');

module.exports.createProject = function (req, res) {

    var keym = req.body.keym_car;
    var id_proyecto = 0;
    var id_usuario = req.body.id_usuario_act;

    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var icon = req.body.icon;


    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        Caracteristica.createCharacteristic(req, 'P').
            then(x => {
                var keym_car = x.keym;
                var id_caracteristica_car = x.id_caracteristica;
                var id_usuario_car = x.id_usuario;
                var fecha_ultima_modificacion = x.fecha_ultima_modificacion;

                id_proyecto = req.body.id_proyecto;

                var query1 = `
                insert into proyectos values (
                    `+ keym + `,
                    `+ id_proyecto + `,
                    `+ id_usuario + `,

                    `+ keym_car + `,
                    `+ id_usuario_car + `,
                    `+ id_caracteristica_car + `,
                    
                    '`+ nombre + `',
                    '',
                    `+ false + `,
                    '`+ icon + `',
                    '`+ descripcion + `',
                    `+ 0 + `,
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

            }).
            catch(x => {
                console.log('Error registrar Caracteristica ' + x);
                reject(false);
            });
    });

};