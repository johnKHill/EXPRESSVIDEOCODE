const express = require('express');
const app = express();

const mongodb = require('mongodb');
const mongoClient = mongodb.mongoClient;
const mongoURL = `mongodb://localhost:27017`

let db;
mongoClient.connect(mongoUrl, (error, databaseConn)=> {
  db = databaseConn.db('electricOrNot');
});

app.get('/', (req, res)=> {
  db.collection('cars'.find({imageSrc:"teslax.jpg"})).toArray((queryError, carsResults) => {
    console.log(carsResults);
    res.json(carsResults);
  });
});

app.listen(3000);