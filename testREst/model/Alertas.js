
var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();

module.exports.newAlert = function (data) {
    console.log("ALERTA===>>>" + JSON.stringify(data));

    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();

        var query1 = `select id_alerta,mensaje,al.id_marcador,latitud,longitud,nombre,color,visto,cm.id_categoria,m.keym,m.id_caracteristica,m.id_usuario 
        from alertas al join marcador m on al.id_marcador = m.id_marcador
        join categorias_mapa cm on m.id_categoria = cm.id_categoria ORDER by visto,id_alerta;
        `;

        console.log(query1);
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT }).
            then(x => {
                console.log('RESPONDE ALERTA =======>    ' + JSON.stringify(x))
                resolve(x);
            }).catch(x => {
                resolve(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}

module.exports.deleteAlert = function (data) {
    console.log("ALERTA===>>>" + JSON.stringify(data));

    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();

        var query1 = `delete from alertas where 
        id_alerta =`+ data.id_alerta + `;
        `;

        console.log(query1);
        sequelize.query(query1, { type: sequelize.QueryTypes.DELETE }).
            then(x => {
                resolve(x);
            }).catch(x => {
                resolve(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}
module.exports.changeVistoAlert = function (data,data2) {
    console.log("ALERTA===>>>" + JSON.stringify(data));

    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();

        var query1 = `update alertas set visto =` + data2 +` where id_alerta=`+ data + `;
            `;

        console.log(query1);
        sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE }).
            then(x => {
                console.log('RESPONDE ALERTA =======>    ' + JSON.stringify(x))
                resolve(x);
            }).catch(x => {
                resolve(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}