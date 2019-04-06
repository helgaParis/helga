'use strict';

const express = require('express');
const app = express();
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const dbName = 'joueurs';

const session = require('express-session')
const bodyParser = require('body-parser');


const socketIo = require('socket.io');
const uuidv1 = require('uuid/v1');

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




app.use(session({
   /* genid: function(req) {
        return genuuid() // use UUIDs for session IDs
      },*/
    secret: 'test 822580103402075014',
	//secret: config.secretSession,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*/
app.get('/index', function(req, res,next){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        //voir cela
        const db = client.db(dbName);
        const collection = db.collection('ratp');
        collection.find({}).sort({stop_name: -1}).toArray(function(err,data){
            client.close();
             res.render('index',{title: 'Stations de métro',data:data});
        });
    });  
});*/

//////////////*******************//////////////////****** */
//////  les reponses /////



app.set('view engine', 'pug');
app.set('views',  './public/views');

app.get('/index', function(req,res,next) {
    res.render('index',{title: 'Helga Petrovic Project de formation'});
    
});
app.get('/', function(req,res,next) {
    res.render('index',{title: 'Helga Petrovic Project de formation'});
});


app.get('/total', function(req,res,next) {
    res.render('total',{title: 'test titre'});
});
app.get('/contact',function (req,res,next){
    res.render('contact', {title: 'Helga Petrovic Contact Info'});
});
app.get('/services',function (req,res,next){
    res.render('services',{title: 'Helga Petrovic Services'} );
});
app.get('/stories',function (req,res,next){
    res.render('stories',{title: 'Helga Petrovic stories'} );
});
app.get('/expos',function (req,res,next){
    res.render('expos',{title: 'Expositions de photo'} );
});

app.listen(8080,function() {   
    console.log('L\'application est disponible port 8080');
});