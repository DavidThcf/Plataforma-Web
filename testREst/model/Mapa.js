var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var Caracteristica = require('./Caracteristicas');

//Service to regiter a new point
module.exports.regPoint = function (data) {
    console.log('REGPoint  ==>   '+JSON.stringify(data));
    var keym = data.keym;
    var id_caracteristica = data.id_caracteristica;
    var id_usuario = data.id_usuario;

    var latitud = data.latitud;
    var longitud = data.longitud;
    var id_categoria = data.id_categoria;
    //var etiqueta = data.etiqueta;

    var  query1 = `
         insert into marcador (keym,id_caracteristica,id_usuario,latitud,longitud,id_categoria) values (
            '`+ keym + `',
            '`+ id_caracteristica + `',
            '`+ id_usuario + `',
            '`+ latitud + `',
            '`+ longitud + `',
            '`+ id_categoria + `'
        ); 
    `;
    console.log('\n\nQUERY1  ===>  '+query1);
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

//Service to update marker point
module.exports.updatePoint = function(data){
    var sequelize = sqlCon.configConnection();
    var query1 = `
        update marcador set
        
        latitud = '`+data.latitud+`',
        longitud = '`+data.longitud+`',
        id_categoria = `+data.id_categoria+`
        
        
        where 
        id_marcador = `+data.id_marcador+`
    `;
    console.log('QERY '+query1);
    return new Promise((resolve, reject) => {
        sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE })
            .then(x => {
                console.log('Se actualizo correctamente la iformacion del marcador');
                resolve(true);
            }).catch(x => {
                console.log('Error al actualizar informacion del marcador ' + x);
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}

//Servoce to get point list
module.exports.getPointList = function(data){
    console.log('\n\n\n\nGEtPintList ===> '+JSON.stringify(data));
    var sequelize = sqlCon.configConnection();
    var query1 = `
        select keym,
            id_caracteristica,
            id_usuario,
            latitud,
            longitud,
            id_categoria from marcador 
        where keym = `+data.keym+`
        and id_caracteristica = `+data.id_caracteristica+`
        and id_usuario = `+data.id_usuario+`
    `;
    console.log('\n\n\n\n\n\nQUERY YAY ===>  '+query1);
    return new Promise((resolve, reject) => {
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
            .then(x => {
                console.log('Se encontro correctamente la lista de puntos\n\n\n'+JSON.stringify(x));
                resolve(x);
            }).catch(x => {
                console.log('NO se encontro correctamente la lista de puntos ' + x);
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}