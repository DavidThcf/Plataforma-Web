var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var Caracteristica = require('./Caracteristicas');

module.exports.regPoint = function (data) {
    var keym = data.keym;
    var id_caracteristica = data.id_caracteristica;
    var id_usuario = data.id_usuario;

    var latitud = data.latitud;
    var longitud = data.longitud;
    var id_categoria = data.id_caracteristica;
    var etiqueta = data.etiqueta;

    var  query1 = `
         insert into catergorias_mapa (keym,id_caracteristica,id_usuario,latitud,longitud,id_categoria,etiqueta) values (
            '`+ keym + `',
            '`+ id_caracteristica + `',
            '`+ id_usuario + `',
            '`+ latitud + `',
            '`+ longitud + `',
            '`+ id_caracteristica + `',
            '`+ etiqueta + `'
        ); 
    `;

    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        sequelize.query(query1, {
            type: sequelize.QueryTypes.INSERT
        })
            .then(x => {
                console.log('Se ha registrado satisfactoriamente el punto.');
                resolve(true);
            }).catch(x => {
                console.log('No se ha registrado el punto. ' + x);
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado session correctamente');
            });
    });
}