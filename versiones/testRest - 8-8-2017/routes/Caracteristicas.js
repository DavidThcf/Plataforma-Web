var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('./connectionDb.js');
var sequelize = sqlCon.configConnection();
var router = express.Router();



module.exports.createCharacteristic = function (req, type_char) {

    //Informacion segun la caracteristica 

    var keym_padre = req.body.keym_car;
    var id_caracteristica_padre = req.body.id_caracteristica;
    var id_usuario_padre = req.body.id_usuario_car;

    //Datos actuales
    var keym_car = 0;
    var id_usuario_car = req.body.id_usuario_act;
    var id_caracteristica_car;  //Luego asignamos su respectivo valor

    //Al momento de crearse la caracteristica el usuario asignado es el mismo que lo creo    
    var usuario_asignado = req.body.id_usuario_act;

    var estado = 'Iniciacion';
    var porcentaje_asignado = req.body.porcentaje_asignado;
    var porcentaje_cumplido = req.body.porcentaje_cumplido;
    var recursos = req.body.recursos;
    var recursos_restantes = req.body.recursos_restantes;
    var presupuesto = req.body.presupuesto;
    var costos = req.body.costos;
    var tipo_caracteristica = type_char;
    var visualizar_superior = true;

    var publicacion_web = false;
    var porcentaje = 0;
    var publicacion_reporte = false;

    //Date
    var current_date = new Date();
    var fecha_inicio = req.body.fecha_inicio;
    var fecha_fin = req.body.fecha_fin;
    var fecha_ultima_modificacion = current_date.toLocaleString();



    //Obtenemos el id_caracteristica actual de esta caracteristica

    return new Promise((resolve, reject) => {
        getIdCharacteristic(keym_padre, id_usuario_padre, id_caracteristica_padre,tipo_caracteristica).then(x => {
            req.body.id_caracteristica = parseInt(x[0].car) + 1;
            id_caracteristica_car = parseInt(x[0].car) + 1;
            console.log('Car => '+id_caracteristica_car+'  -  '+x[0].car);

            if (tipo_caracteristica === 'A')
                req.body.id_actividad = parseInt(x[0].act) + 1;
            else
                req.body.id_proyecto = parseInt(x[0].prj) + 1;

            var query1 = `
            INSERT INTO caracteristicas 
            VALUES (
                `+ keym_car + `,
                `+ id_usuario_car + `,
                `+ id_caracteristica_car + `,
                
                `+ keym_padre + `,
                `+ id_usuario_padre + `,
                `+ id_caracteristica_padre + `,
                
                '`+ estado + `',
                `+ porcentaje_asignado + `,
                `+ porcentaje_cumplido + `,
                `+ recursos + `,
                `+ recursos_restantes + `,
                `+ presupuesto + `,
                `+ costos + `,
                '`+ tipo_caracteristica + `',
                `+ visualizar_superior + `,
                `+ usuario_asignado + `,
                `+ publicacion_web + `,
                `+ porcentaje + `,
                '`+ fecha_inicio + `',
                '`+ fecha_fin + `',
                '`+ fecha_ultima_modificacion + `',
                `+ publicacion_reporte + `

            );`;


            //Creacion de Query para insertar datos a la base de datos


            sequelize.query(query1, { type: sequelize.QueryTypes.INSERT })
                .then(x => {
                    console.log('Se ha registrado correctamente la Caracteristica');
                    //JSON con datos a ser devueltos para crear la actividad
                    var json_char = {
                        keym: keym_car,
                        id_caracteristica: id_caracteristica_car,
                        id_usuario: id_usuario_car,
                        fecha_ultima_modificacion: fecha_ultima_modificacion
                    };
                    resolve(json_char);
                }).catch(x => {
                    console.log('Error' + x);
                    reject(false);
                });




        }).catch(x => {
            console.log("Gran error getIdCharacteristic(): " + x);
            reject = false;
        });
    });

}

function getIdCharacteristic(keym, id_usuario, id_caracteristica, type_char) {
    var query1;
    console.log('Type   => '+type_char);
    if (type_char === 'A') {
        query1 = `
        
        select max(caracteristicas.id_caracteristica) as car , max(actividades.id_actividad) as act
        from actividades natural join caracteristicas
        where keym_padre = `+ keym + ` and id_usuario_padre = ` + id_usuario + ` and id_caracteristica_padre = ` + id_caracteristica + `
        `;
    }
    else {
        query1 = `
        select max(caracteristicas.id_caracteristica) as car , max(proyectos.id_proyecto) as prj
        from proyectos natural join caracteristicas
        where keym_padre = `+ keym + ` and id_usuario_padre = ` + id_usuario + ` and id_caracteristica_padre = ` + id_caracteristica + `
        `;
    }

    return new Promise((resolve, reject) => {
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
            .then(x => {
                resolve(x);
            }).catch(x => {
                console.log('Error getIdCharacteristic() execute query1 ' + x);
                reject(x);
            });
    });
}