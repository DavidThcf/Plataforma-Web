var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var fls = require('../model/Archivos');

var router = express.Router();
var Caracteristica = require('./Caracteristicas');
var repository = 'files/';

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
                
                WHERE keym= `+ keym_car + ` 
                and id_caracteristica = `+ id_caracteristica_car + ` 
                and id_usuario = `+ id_usuario_car + `;
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

module.exports.createProject = function (data, files) {
    //informacion
    var nombre = data.nombre;
    var descripcion = data.descripcion;
    var icon = data.icon;
    if(icon=== undefined)
        icon ='';
    var id_usuario = data.id_usuario;
    var keym =0 ;

    //fecha
    var current_date = new Date();
    var fecha_ultima_modificacion = current_date.toLocaleString();

    return new Promise((resolve, reject) => {
        Caracteristica.createCharacteristic(data, 'P').then(x => {
            
            console.log("\n\n\n\n\n\n\n YAY "+JSON.stringify(x)+'\n'+keym+'     '+id_usuario);
            getIdFreeProject(id_usuario, keym).
                then(id => {
                    var sequelize = sqlCon.configConnection();
                    var query1 = `
                            insert into proyectos values (
                                `+ keym + `,
                                `+ id + `,
                                `+ id_usuario + `,

                                `+ x.keym + `,
                                `+ x.id_usuario + `,
                                `+ x.id_caracteristica + `,
                                
                                '`+ nombre + `',
                                '',
                                `+ false + `,
                                '`+ icon + `',
                                '`+ descripcion + `',
                                `+ 0 + `,
                                '`+ x.fecha_ultima_modificacion + `');
                        `;
                    sequelize.query(query1, { type: sequelize.QueryTypes.INSERT })
                        .then(x => {
                           
                            var path = repository + 'user' + id_usuario;
                            fls.fileUpload(files, path + '/','');
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



        }).catch(x => {

        });
    });

}

function getIdFreeProject(id_usuario, keym) {
    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        var query1 = `
            select max(id_proyecto) prj from proyectos
            where keym = `+ keym  + ` and id_usuario = ` + id_usuario + `
        `;
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT }).
            then(x => {
                if (x[0].prj!= null || x[0].prj>0)
                    resolve(parseInt(x[0].prj) + 1);
                else
                    resolve(1);
            }).catch(x => {
                console.log('EROR  ->  PRJ  '+x);
                reject(false);
            }).done(x => {
                sequelize.close();
                console.log('Se ha cerrado sesion de la conexion a la base de datos');
            });
    });
}