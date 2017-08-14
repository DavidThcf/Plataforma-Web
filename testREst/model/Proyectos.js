var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');

var router = express.Router();
var Caracteristica = require('./Caracteristicas');

module.exports.createProjectFromActivity = function (data) {

    //caracteristica
    var keym_car = data.keym;
    var id_caracteristica_car = data.id_caracteristica;
    var id_usuario_car = data.id_usuario;

    //informacion
    var nombre = data.nombre;
    var descripcion = data.descripcion;
    var icon = data.icon;

    //fecha
    var current_date = new Date();
    var fecha_ultima_modificacion = current_date.toLocaleString();

    //creacion del proyecto

    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        getIdFreeProject(id_usuario, keym).
            then(x => {
                var query1 = `
                insert into proyectos values (
                    `+ keym + `,
                    `+ x + `,
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
                
                UPDATE caracteristicas 
                SET tipo_caracteristica = 'P'
                
                WHERE keym= `+keym_car+` 
                and id_caracteristica = `+id_caracteristica_car+` 
                and id_usuario = `+id_usuario_car+`;
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
                console.log('ERROR al registrar el PROYECTO.');
            });



    });

};

module.exports.getListProjects = function (id_user) {
    var sequelize = sqlCon.configConnection();
    var query1 = `
        select * from proyectos 
        join caracteristicas on proyectos.keym_car = caracteristicas.keym 
        and proyectos.id_usuario_car = caracteristicas.id_usuario 
        and proyectos.id_caracteristica = caracteristicas.id_caracteristica 
        where proyectos.id_usuario =` + id_user + `
        
        `;



    return new Promise((resolve, reject) => {
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT })
            .then(x => {
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

module.exports.createProject = function (data) {
    //caracteristica
    var keym_car = data.keym;
    var id_caracteristica_car = data.id_caracteristica;
    var id_usuario_car = data.id_usuario;

    //informacion
    var nombre = data.nombre;
    var descripcion = data.descripcion;
    var icon = data.icon;

    //fecha
    var current_date = new Date();
    var fecha_ultima_modificacion = current_date.toLocaleString();

    return new Promise((resolve, reject) => {
        Caracteristica.createCharacteristic(data, 'P').then(x => {
            return new Promise((resolve, reject) => {
                var sequelize = sqlCon.configConnection();
                getIdFreeProject(id_usuario, keym).
                    then(id => {
                        var query1 = `
                            insert into proyectos values (
                                `+ keym + `,
                                `+ id + `,
                                `+ id_usuario + `,

                                `+ x[0].keym + `,
                                `+ x[0].id_usuario + `,
                                `+ x[0].id_caracteristica + `,
                                
                                '`+ nombre + `',
                                '',
                                `+ false + `,
                                '`+ icon + `',
                                '`+ descripcion + `',
                                `+ 0 + `,
                                '`+ x[0].fecha_ultima_modificacion + `');
                        `;

                        sequelize.query(query1, { type: sequelize.QueryTypes.INSERT })
                            .then(x => {
                                console.log('Se ha registrado correctamente el proyecto')
                                resolve(true);
                            }).catch(x => {
                                console.log('Error: Ha ocurrido un error al registrar el proyecto. ' + x);
                                reject(false);
                            }).done(x => {
                                sequelize.close();
                                console.log('Se ha cerrado sesion de la conexion a la base de datos');
                            });
                    }).catch(x => {
                        console.log('ERROR al registrar el PROYECTO.');
                    });

            });

        }).catch(x => {

        });
    });

}

function getIdFreeProject(id_usuario, keym) {
    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        var query = `
            select max(id_proyecto) prj from proyectos
            where keym = `+ id_usuario + ` and id_usuario = ` + keym + `
        `;
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT }).
            then(x => {
                if (x.lenght > 0)
                    resolve(parseInt(x[0].prj) + 1);
                else
                    resolve(0);
            }).catch(x => {
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}