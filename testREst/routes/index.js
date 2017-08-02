var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');

/*const sequelize = new Sequelize('MProjectPru', 'postgres', 'NJpost2016', {
	host: 'knower.udenar.edu.co',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});*/

const sequelize = new Sequelize('pstt', 'postgres', '1', {
	host: '127.0.0.1',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});

sequelize
.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('usuarios', {
	id_usuario: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	e_mail: {
		type: Sequelize.STRING
	},
	pass: {
		type: Sequelize.STRING
	},
	nombre: {
		type: Sequelize.STRING
	},
	apellido:{
		type: Sequelize.STRING
	}

});


var heroeslist;

/*router.get('/', function(req, res, next) {
	User.findAll().then(usuarios => {
		heroeslist = usuarios;
	});
	res.header("Access-Control-Allow-Origin", "*");
	res.send(heroeslist);
});*/

router.get('/:email/:password', function(req, res, next) {	
	User.findAll({
		where:{
			e_mail: req.params.email,
			pass: req.params.password
		}
	}).then(heroe => { 
		var obj = JSON.stringify(heroe).replace(/\[/g, "").replace(/\]/g, "");
		res.header("Access-Control-Allow-Origin", "*");
		res.send(obj);
	});	
});


router.get('/:id_usuario', function(req, res, next) {
	var cad = 	"select * from proyectos join caracteristicas on proyectos.keym_car = caracteristicas.keym and proyectos.id_usuario_car = caracteristicas.id_usuario and proyectos.id_caracteristica = caracteristicas.id_caracteristica  where caracteristicas.id_usuario =" + req.params.id_usuario;
	sequelize.query(cad, { type: sequelize.QueryTypes.SELECT})
	.then(proyectos => {
		var obj = JSON.stringify(proyectos).replace(/\[/g, "").replace(/\]/g, "");
		res.header("Access-Control-Allow-Origin", "*");
		res.send(proyectos);
	})
});

/* GET home page. */
//aqui haces url limpia con el /: variable
router.post('/:email/:password', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send("hola: "+req.params.email + " " +req.params.password )
});


router.post('/api/', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var usuario = [{
		"email": email,
		"password" : password,
		"nombre" : 'Luis',
		"apellido" : 'Perez'
	}];

	res.header("Access-Control-Allow-Origin", "*");
	res.send(JSON.stringify(usuario));
});

module.exports = router;
