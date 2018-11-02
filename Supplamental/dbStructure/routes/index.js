var express = require('express');
var router = express.Router();
const db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  const query = `SELECT * FROM city_weathers WHERE id > $1`;
  const scrayDataFromInternet = 36;
  db.query(query, [scrayDataFromInternet], (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);

  });
  // pool.end();
});


/* GET cities page. */
router.get('/cities', function(req, res, next) {
  const query = `SELECT * FROM city_weathers WHERE id <= $1`;
  const scrayDataFromInternet = 36;
  db.query(query, [scrayDataFromInternet], (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);

  });
});

module.exports = router;
