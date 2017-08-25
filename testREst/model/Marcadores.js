var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var Caracteristica = require('./Caracteristicas');


module.exports.getMarkersListFromCategory = function(id_categoria){
	var sequelize = sqlCon.configConnection();
    var query1 = `
		select * from categorias_mapa m natural join caracteristicas c  join actividades a 
		on c.keym = a.keym_car
		and c.id_caracteristica = a.id_caracteristica
		and c.id_usuario = a.id_usuario_car
		join marcador p
		on p.id_categoria = m.id_categoria
		where m.id_categoria = `+id_categoria+`   
        `;



    return new Promise((resolve, reject) => {
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
            .then(x => {
                console.log('OK consulta get Activity from Category');
                resolve(x);
            }).catch(x => {
                console.log('Error al obtener las Actividades from Category' + x);
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}