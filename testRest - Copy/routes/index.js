var express = require('express');
var router = express.Router();

//Model's Variables 
var User = require('./Usuarios');
var Activity =  require('./Actividades');
var Project = require("./Proyectos")

//POST Services 

//Service for createa new User
router.post('/createUser', function (req, res, next) {
	var usr = User.createUser(req, res);
	usr.then(x => {
		console.log('CreateUser OK');
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Se ha registrado correctamente el usuario.");
	}).catch(x => {
		console.log('Error:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("No se podido registrar el usuario.");
	});
});

//Service for create a new Activity
router.post('/createActivity', function (req, res, next) {
	var act = Activity.createActivity(req,res);
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
	var prj = Project.createProject(req,res);
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
