var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
var sqlCon = require('./connectionDb.js');
var sequelize = sqlCon.configConnection();
var bigInt  = require('big-integer');


//Constantes del modelo
const Proyecto = sequelize.import('../models/proyectos');
const Caracteristica = sequelize.import('../models/caracteristicas');
const Usuario = sequelize.import('../models/usuarios.js');



//servicios

router.get('/:email/:password', function (req, res, next) {
	Usuario.findAll({
		where: {
			e_mail: req.params.email,
			pass: req.params.password
		}
	}).then(heroe => {
		var obj = JSON.stringify(heroe).replace(/\[/g, "").replace(/\]/g, "");
		res.header("Access-Control-Allow-Origin", "*");
		res.send(obj);
	});
});


router.get('/:id_usuario', function (req, res, next) {
	var cad = "select * from proyectos join caracteristicas on proyectos.keym_car = caracteristicas.keym and proyectos.id_usuario_car = caracteristicas.id_usuario and proyectos.id_caracteristica = caracteristicas.id_caracteristica  where caracteristicas.id_usuario =" + req.params.id_usuario;
	sequelize.query(cad, {
			type: sequelize.QueryTypes.SELECT
		})
		.then(proyectos => {
			var obj = JSON.stringify(proyectos).replace(/\[/g, "").replace(/\]/g, "");
			res.header("Access-Control-Allow-Origin", "*");
			res.send(proyectos);
		})
});



/* GET home page. */
//aqui haces url limpia con el /: variable
/*
router.post('/:email/:password', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send("hola: "+req.params.email + " " +req.params.password )
});
*/

router.post('/', function (req, res, next) {
	console.log(req);
	var email = req.body.email;
	var password = req.body.password;
	console.log(email + '  ' + password);
	var usuario = [{
		"email": email,
		"password": password,
		"nombre": 'Luis',
		"apellido": 'Perez'
	}];

	res.header("Access-Control-Allow-Origin", "*");
	res.send(JSON.stringify(usuario));
});


router.post('/createUser', function (req, res, next) {
	//console.log(req);
	//variables del usuario
	var email = req.body.email;
	var password = req.body.password;
	var nombre = req.body.nombre;
	var apellido = req.body.apellido;
	var genero = req.body.genero;
	var cargo = req.body.cargo;
	var telefono = req.body.telefono;
	var entidad = req.body.entidad;
	var imagen = req.body.imagen;

	//Insertar en base de datos

	var usr = {
		"password": this.password,
		"administrador": false,
		"e_mail": this.email,
		"nombre": this.nombre,
		"apellido": this.apellido,
		"genero": this.genero,
		"cargo": this.cargo,
		"telefono": this.telefono,
		"entidad": this.entidad,
		"imagen": '',
		"diponible": true
	};


	var cad = `INSERT INTO usuarios 
	("pass","e_mail","nombre","apellido","genero","cargo","telefono","entidad","imagen","disponible") 
	  VALUES (
		  	'`+password+`',
			'`+email+`',
			'`+nombre+`',
			'`+apellido+`',
			'`+genero+`',
			'`+cargo+`',
			'`+telefono+`',
			'`+entidad+`',
			'`+imagen+`',
			false
		);`;
			
		console.log(cad);

	sequelize.query(cad, { type: sequelize.QueryTypes.INSERT })
		.then(x => {
			console.log('OK');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(JSON.stringify(x));

			
		}).catch(x=>{
			console.log('Error'+x);
			res.header("Access-Control-Allow-Origin", "*");
			res.send(JSON.stringify(x));
			
		});

/*
	sequelize.query("select id_usuario from usuarios order by id_usuario desc limit 1", {
			type: sequelize.QueryTypes.SELECT
		})
		.then(x => {
			var id_usu = bigInt('1000000000000000') + 1;
			Usuario.create({
				id_usuario: ,
				pass: password,
				administrador: false,
				e_mail: email,
				nombre: nombre,
				apellido: apellido,
				genero: genero,
				cargo: cargo,
				telefono: telefono,
				entidad: entidad,
				imagen: '',
				diponible: true
			}).then(x => {
				console.log("exito");
				res.header("Access-Control-Allow-Origin", "*");
				res.send(true);
			}).catch(x => {
				//console.log(usd);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(false);
				console.log("error " + x);
			});
		});

*/



});



router.post('/createActivity', function (req, res, next) {
	console.log(req);
	//variables del usuario
	//==> actividad
	var keym = req.body.keym;
	var id_actividad = req.body.id_actividad;
	var id_usuario = req.body.id_usuario;

	var keym_car = req.body.keym_car;
	var id_usuario_car = req.body.id_usuario_car;
	var id_caracteristica = req.body.id_caracteristica;

	var nombre = req.body.nombre;
	var descripcion = req.body.descripcion;
	var pos = req.body.pos;
	var folder = req.body.folder;

	//==>caracateristica
	var keym_padre = req.body.keym_padre;
	var id_caracteristica_padre = req.body.id_caracteristica_padre;
	var id_usuario_padre = req.body.id_usuario_padre;
	var estado = req.body.estado;
	var porcentaje_asignado = req.body.porcentaje_asignado;
	var porcentaje_cumplido = req.body.porcentaje_cumplido;
	var recursos = req.body.recursos;
	var recursos_restantes = req.body.recursos_restantes;
	var presupuesto = req.body.presupuesto;
	var costos = req.body.costos;
	var usuario_asignado = req.body.usuario_asignado;
	var fecha_inicio = req.body.fecha_inicio;
	var fecha_fin = req.body.fecha_fin;



	//Insertar en base de datos





	console.log(usd);
	res.header("Access-Control-Allow-Origin", "*");
	res.send(JSON.stringify(usr));
});



module.exports = router;
