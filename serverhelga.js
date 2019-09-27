'use strict';

const express = require('express');
const app = express();
const path = require('path');


const session = require('express-session');
const bodyParser = require('body-parser');


const http = require('http');
const httpServer = http.createServer();




// Gestion des fichiers statiques
app.use('/css', express.static(__dirname + '/files/css'));
app.use('/js', express.static(__dirname + '/files/js'));
app.use('/jquery', express.static(__dirname + '/files/jquery'));
app.use('/images', express.static(__dirname + '/files/images'));
app.use('/photos', express.static(path.join(__dirname +'/files/photos')));
app.use('/pdf', express.static(path.join(__dirname +'/files/pdf')));

app.use(express.static(path.join(__dirname, 'public/html')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//////////////*******************//////////////////****** */
//////  les reponses /////

app.set('view engine', 'pug');
app.set('views',  './public/views');

app.get('/', function(req, res){
    res.render('devjs',{title: 'Helga Petrovic - dev JS'});   
  });
app.get('/index', function(req,res,next) {
    res.render('devjs',{title: 'Helga Petrovic - dev JS'});   
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
    res.render(cible,{title: 'Helga Petrovic Stories'} );
    d = null;
    i = null;
    cible = null;

});

app.get('/expos',function (req,res,next){
    res.render('expos',{title: 'Expositions de photo'} );
});
app.get('/rouen',function (req,res,next){
    res.render('dias/rouen',{title: 'La grande Armada - Rouen'} );
});
app.get('/moab',function (req,res,next){
    res.render('dias/moab',{title: 'Moab - Voyage sur mars'} );
});
app.get('/implosion',function (req,res,next){
    res.render('dias/implosion',{title: 'Implosion - Sète'} );
});
app.get('/voyages',function (req,res,next){
    res.render('dias/voyages',{title: 'Voyages'} );
});
app.get('/mentions',function (req,res,next){
    res.render('mentions',{title: 'Mentions légales'} );
});
app.get('/devjs',function (req,res,next){
    res.render('devjs',{title: 'Full Stack Java Script'} );
});

//Le jeu se trouve sur un autre port du même serveur, en single page app
app.get('/jeu2',function (req,res,next){
    res.status(301).redirect("http://jeu.petrovic.ovh/");
});
//Lien vers un projet en cours
app.get('/asf',function (req,res,next){
    res.status(301).redirect("https://dougvonpetrovic.fr");
});
app.get('/git',function (req,res,next){
    res.status(301).redirect("https://github.com/helgaParis?tab=overview&from=2019-08-01&to=2019-08-31");
});

//Cette route sans lien dans le site sert à tester des choses plus facilement
app.get('/tester',function (req,res,next){
    res.render('test/tester',{title: 'Expositions de photo - moab'} );
});

//le fichier 404
 app.use(function (req, res, next) {
	return res.status(404).render('404');
});

app.listen(8080,function() {   
    console.log('serveur http disponible port 8080');
});