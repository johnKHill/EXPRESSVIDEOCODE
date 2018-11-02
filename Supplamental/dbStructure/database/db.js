const PoolClass = require('pg').Pool;

const pool = new PoolClass({
  user: 'postgress',
  host: 'localhost',
  databate: 'weatherTiler_development',
  port: 5432,
  password: ''
});

module.exports= {
  query: (queryText, params, callback)=> {
    return pool.query(queryText, params, callback);
  }
}