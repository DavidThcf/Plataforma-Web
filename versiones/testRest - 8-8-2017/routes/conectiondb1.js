const Sequelize = require('sequelize');
const express = require('express');


const sequelize = new Sequelize('TourHeroes', 'postgres', '1', {
  host: 'localhost',
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

const User = sequelize.define('heroes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING
  }
});

/*var p1 = User.sync().then(function () {   
  return User.create({
    id: 22,
    nombre: "PEPE"
  });
});*/


var heroeslist;
var heroe;

router.get('/', function(req, res) {

  User.findAll().then(heroes => {
    heroeslist = heroes;
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(heroeslist);
});


router.get('/:id?', function(req, res, next) {
  User.findAll({
    where:{
      id: req.params.id
    }
  }).then(heroe => {    
   this.heroe = heroe;
 });
  console.log(this.heroe);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(this.heroe);
  next();
});    


module.exports = router;