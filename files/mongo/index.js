'use strict';

const MongoClient = require('mongodb').MongoClient;

let dbName = 'users';
let collection ='helga';


let assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
//ou
//var url = 'mongodb://dave:password@localhost:27017/myproject';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});