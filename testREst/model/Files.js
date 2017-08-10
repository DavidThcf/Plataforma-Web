var express = require('express');
var Sequelize = require('sequelize');
var sqlCon = require('../config/connectionDb');
var router = express.Router();
var fs = require('fs');

var repository = 'files/';


module.exports.fileUpload = function (files, path) {

	var file;

	var result = '-1';

	if (!files) {
		result = '0';
		console.log("no existe archivo");
	}
	else {
		file = files.file;

		//var fina = file.name.replace(/\s/g, "");
		var fina = file.name = 'profile.jpg';

		file.mv(path + fina, function (err) {
			if (err) console.log("error " + err.toString());
			else console.log("carga exitosa");
		});

	}
}
