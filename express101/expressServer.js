// NODEJS is the language
// Express is node, a node module

const path = require('path');

// http is a native module
// const http = require('http');

// express is a 3rd party module
// need to run npm init
// then, npm install express --save
const express = require('express');
// An "app" is the express function (createApplication indes the Express module)
// invoked and is an Express application
const app = express();

// serve up static files! Only 1 line... take that nodesjs
app.use(express.static('public'));

// all is a method, and takes 2 args:
// 1. route
// 2. callback to run if the route is requested
app.all('/', (req, res)=> {
    // Express handles the basic headers (status code, mine-type)! Awesome!
    // read in Node.html
    console.log(path.join(__dirname + '/node.html'));
    res.sendFile(path.join(__dirname + '/node.html'));
    // res.send(`<h1>This is the home page!</h1>`);
    // Express handles the end! Awesome!

});
// star matches any path and .all will match any method type
// the .all below with the star will only qualify if the other .all does not
app.all('*', (req, res)=> {
    res.send(`<h1>Sorry, this page does not exist</h1>`);
})

app.listen(3000);
console.log("The server is listening on port 3000...");
