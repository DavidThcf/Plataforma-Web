module.exports.newAlert = function (data) {
    console.log("ALERTA===>>>"+ JSON.stringify(data));
        
    return new Promise((resolve, reject) => {
        var sequelize = sqlCon.configConnection();
        var query1 = "";
        if(flag =="true"){
             query1 = `

            select * from archivos a, (select val_configuracion from configuracion_inicial where id = 1) as t1
            where keym_car = `+ keym + ` 
            and id_caracteristica = `+ id_caracteristica + ` 
            and id_usuario_car = `+ id_usuario + `
            and tipo = '`+data.tipo+`' and id_marcador is null ;
            `;


        }else{
            if(id_marcador){
                  query1 = `

            select * from archivos a, (select val_configuracion from configuracion_inicial where id = 1) as t1
            where keym_car = `+ keym + ` 
            and id_caracteristica = `+ id_caracteristica + ` 
            and id_usuario_car = `+ id_usuario + `
            and tipo = '`+data.tipo+`' 
            and id_marcador  = '`+id_marcador+`'
            `;

            }else{
                  query1 = `

            select * from archivos a, (select val_configuracion from configuracion_inicial where id = 1) as t1
            where keym_car = `+ keym + ` 
            and id_caracteristica = `+ id_caracteristica + ` 
            and id_usuario_car = `+ id_usuario + `
            and tipo = '`+data.tipo+`' and id_marcador is not null ;
            `;

            }

        }
        
        console.log(query1);
        sequelize.query(query1, { type: sequelize.QueryTypes.SELECT }).
        then(x => {
            console.log('RESPONDE =======>    ' + JSON.stringify(x))
            resolve(x);
        }).catch(x => {
            resolve(false);
        }).done(x => {
            sequelize.close();
            console.log('Se ha cerrado sesion de la conexion a la base de datos');
        });;
    });

}