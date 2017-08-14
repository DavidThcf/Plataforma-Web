var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var Caracteristica = require('./Caracteristicas');

module.exports.regCategories = function (data) {
    var id_categoria = data.id_categoria;
    var nombre = data.nombre;
    var descripcion = data.descripcion;
    var icon = data.icon;
    var color = data.color;

    var query1 = `
        insert into catergorias_mapa (nombre,descripcion,icon,color) values (
            '`+ nombre + `',
            '`+ descripcion + `',
            '`+ icon + `',
            '`+ color + `'
        );
    `;

    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        sequelize.query(query1, {
            type: sequelize.QueryTypes.INSERT
        })
            .then(x => {
                console.log('Se ha creado la categoria satisfactoriamente.');
                resolve(true);
            }).catch(x => {
                console.log('Error al registrar la categoria. ' + x);
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Error al registrar la categoria. ' + x);
            });
    });
}