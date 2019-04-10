'use strict';

const express = require('express');
const router = express.Router();



router.get('/jeu1' , function (req, res, next) {
    res.sendFile('index.html', {root:'/public/html/jeu1'}); 
  });

  router.get('/jeu2' , function (req, res, next) {
    res.sendFile('index.html', {root:'/public/html/jeu2'}); 
  });





  module.exports = router;