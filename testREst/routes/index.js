var express = require('express');
var router = express.Router();
var fs = require('fs'); 
var http = require('http');
//Model's Variables 
var User = require('../model/Usuarios');
var Activity = require('../model/Actividades');
var Project = require("../model/Proyectos");
var files = require("../model/Files");
var Category = require('../model/Categorias');
var Map = require('../model/Mapa');
var File = require('../model/Archivos');
//POST Services 

//Service for createa new User
router.post('/createUser', function (req, res, next) {
	var usr = User.createUser(JSON.parse(req.body.usuario), req.files);
	usr.then(x => {
		console.log('CreateUser OK');
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Se ha registrado correctamente el usuario.");
	}).catch(x => {
		console.log('Error user:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		if (x === 'err-mail')
			res.send("El correo electronico ya se encuentra registrado, intentelo con otro.");
		else
			res.send("No se podido registrar el usuario.");
	});
});

//Service for create a new Activity
router.post('/createActivity', function (req, res, next) {
	console.log(JSON.stringify(req.body));
	var act = Activity.createActivity(JSON.parse(req.body.actividad));
	act.then(x => {
		console.log('CreateActivity OK ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.json(true);
	}).catch(x => {
		console.log('Error:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});

});

//Serice for create a new Project
router.post('/createProject', function (req, res, next) {
	var prj = Project.createProject(JSON.parse(req.body.proyecto),req.files);
	prj.then(x => {
		console.log('CreateProject OK ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.json(true);
	}).catch(x => {
		console.log('Error:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

router.post('/createProjectFromActivity', function (req, res, next) {
	var prj = Project.createProjectFromActivity(JSON.parse(req.body.json));
	prj.then(x => {
		console.log('CreateProjectFromActivity OK ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("Se ha registrado correctamente el PROYECTO.");
	}).catch(x => {
		console.log('Error:  ' + x);
		res.header("Access-Control-Allow-Origin", "*");
		res.send("No se podido registrar el proyecto.");
	});
});

//service for get information user when login into application
router.post('/getUser', function (req, res, next) {
	var usr = User.sigIn(JSON.parse(req.body.usuario));

	usr.then(x => {

		if (x === false) {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		} else {
			var obj = JSON.stringify(x).replace(/\[/g, "").replace(/\]/g, "");
			res.header("Access-Control-Allow-Origin", "*");
			res.send(obj);
		}

	}).catch(x => {
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});


});

//service to get user's project list  
router.post('/getUserProjectList', (req, res, next) => {
	var prj = Project.getListProjects(req.body.id_usuario);

	prj.then(x => {
		res.header("Access-Control-Allow-Origin", "*");
		res.send(x);
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//service to get user's activity with theirs characteristics
router.post('/getActivityList', (req, res, next) => {
	
	var act = Activity.getActivityList(req.body);
	act.then(x => {
		if (x != false) {
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//Service to register a new category for work with the map
router.post('/createCategory', (req, res, next) => {
	console.log('----- Create Category  --------  '+JSON.stringify(req.body));
	var cat = Category.regCategories(JSON.parse(req.body.categoria));
	cat.then(x => {
		if (x != false) {
			console.log('Se ha creado correctamente la categoria');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			console.log('No se ha creado la categoria');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//Service to register a new point in the map
router.post('/regPointMap',(req,res,next)=>{
	var map = Map.regPoint(req.body.point);
	map.then(x => {
		if (x != false) {
			console.log('Se ha registrado correctamente el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			console.log('No se ha registrado el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//Service to get the list users 
router.post('/getUserList',(req,res,next)=>{
	var usr = User.getUserList(req.body.user);
	usr.then(x => {
		if (x != false) {
			console.log('Se ha registrado correctamente el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			console.log('No se ha registrado el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//service to create a new file into th data base
router.post('/createFile',(req,res,next)=>{
	console.log('BODY===>   '+JSON.stringify(req.body));
	var fls = File.create_file(JSON.parse(req.body.archivo),req.files);
	
	fls.then(x => {
	
			console.log('Se ha registrado correctamente el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(true);
		
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//Service to get list of the files
router.post('/getFileList',(req,res,next)=>{
	console.log('get file list   ==== >   '+JSON.stringify(req.body));
	var fls = File.getFileList(req.body);
	fls.then(x => {
		if (x != false) {
			console.log('Se ha registrado correctamente el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			console.log('No se ha registrado el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

//Service to update the file information
router.post('/updateImageFile',(req,res,next)=>{
	var fls = File.getImagesList(req.body.caracteristica);
	fls.then(x => {
		if (x != false) {
			console.log('Se ha registrado correctamente el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			console.log('No se ha registrado el punto');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

router.post('/getCategoryList',(req,res,next)=>{
	console.log('get category list   ==== >   '+JSON.stringify(req.body.caracteristica));
	var cat = Category.getCategoriesList(JSON.parse(req.body.caracteristica));
	cat.then(x => {
		if (x != false) {
			console.log('Se ha retornado correctamente las categorias');
			res.header("Access-Control-Allow-Origin", "*");
			res.send(x);
		}
		else {
			console.log('No se ha retornado las categorias');
			res.header("Access-Control-Allow-Origin", "*");
			res.json(false);
		}
	}).catch(x => {
		console.log('ERROR =>  ' + x)
		res.header("Access-Control-Allow-Origin", "*");
		res.json(false);
	});
});

module.exports = router;
