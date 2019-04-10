'use strict';

const express = require('express');
const app = express();
const path = require('path');


const session = require('express-session')
const bodyParser = require('body-parser');


const http = require('http');
const httpServer = http.createServer();




// Gestion des fichiers statiques
app.use('/css', express.static(__dirname + '/files/css'));
app.use('/js', express.static(__dirname + '/files/js'));
app.use('/jquery', express.static(__dirname + '/files/jquery'));
app.use('/images', express.static(__dirname + '/files/images'));
//app.use('/moab', express.static(__dirname + '/files/photos/moab'));
app.use('/photos', express.static(path.join(__dirname +'/files/photos')));

app.use(express.static(path.join(__dirname, 'public/html')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//////////////*******************//////////////////****** */
//////  les reponses /////

app.set('view engine', 'pug');
app.set('views',  './public/views');

app.get('/', function(req, res){
    res.render('index',{title: 'Helga Petrovic'});   
  });
app.get('/index', function(req,res,next) {
    res.render('index',{title: 'Helga Petrovic'});   
});

//une route pour des tests pendant la production
app.get('/total', function(req,res,next) {
    res.render('total',{title: 'test titre'});
});
app.get('/contact',function (req,res,next){
    res.render('contact', {title: 'Helga Petrovic Contact Info'});
});
app.get('/services',function (req,res,next){
    res.render('services',{title: 'Helga Petrovic Services'} );
});
//des pages, qui s'affichent en fonction du jour de la semaine (ici avec des histoires courtes. ) J'experimente avec des possibilités.
app.get('/stories',function (req,res,next){
    var d = new Date();
    var ecrit = [ 'dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    var i = d.getDay();
    var cible = ecrit[i];
     
    res.render(cible,{title: 'Helga Petrovic stories'} );
});

app.get('/expos',function (req,res,next){
    res.render('expos',{title: 'Expositions de photo'} );
});
app.get('/rouen',function (req,res,next){
    res.render('rouen',{title: 'Expositions de photo - Rouen'} );
});
//Le jeu se trouve sur un autre port du même serveur, en single page app
app.get('/jeu2',function (req,res,next){
    res.status(301).redirect("http://vps659592.ovh.net/");
});
//Cette route sans lien dans le site sert à tester des choses plus facilement
app.get('/tester',function (req,res,next){
    res.render('test/tester',{title: 'Expositions de photo - moab'} );
});


app.listen(8080,function() {   
    console.log('serveur http disponible port 8080');
});