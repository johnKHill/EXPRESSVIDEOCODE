const express = require('express');
const app = express();
const PoolClass = require('pg').Pool;
// const { Pool } = require('pg');
// const pg = require('pg');
// const pg = pg.Pool;


const pool = new PoolClass({
  user: 'postgress',
  host: 'localhost',
  databate: 'weatherTiler_development',
  port: 5432,
  password: ''
});


app.get('/', (req, res)=> {
  const query = `SELECT * FROM city_weathers WHERE id > $1`;
  const scrayDataFromInternet = 36;
  pool.query(query, [scrayDataFromInternet], (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);

  });
  pool.end();
});

app.listen(3000);