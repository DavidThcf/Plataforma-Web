var express = require('express');
var router = express.Router();

//Model's Variables 
var User = require('../model/Usuarios');
var Activity =  require('../model/Actividades');
var Project = require("../model/Proyectos")

//POST Services 

//Service for createa new User
router.post('/createUser', function (req, res, next) {
	var usr = User.createUser(JSON.parse(req.body.json));
	usr.then(x => {
		console.log('CreateUser OK');
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Se ha registrado correctamente el usuario.");
	}).catch(x => {
		console.log('Error user:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		if(x === 'err-mail')
			res.send("El correo electronico ya se encuentra registrado, intentelo con otro.");
		else
			res.send("No se podido registrar el usuario.");
	});
});

//Service for create a new Activity
router.post('/createActivity', function (req, res, next) {
	var act = Activity.createActivity(JSON.parse(req.body.json));
	act.then(x => {
		console.log('CreateActivity OK '+x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Se ha registrado correctamente la ACTIVIDAD.");
	}).catch(x => {
		console.log('Error:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("No se podido registrar la actividad.");
	});

});

//Serice for create a new Project
router.post('/createProject',function(req,res,next){
	var prj = Project.createProject(JSON.parse(req.body.json));
	prj.then(x => {
		console.log('CreateActivity OK '+x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Se ha registrado correctamente el PROYECTO.");
	}).catch(x => {
		console.log('Error:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("No se podido registrar el proyecto.");
	});
});

module.exports = router;
