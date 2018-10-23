const express = require('express');
const app = express();

// app comes with a 'use' method
// this is how you invoke 'middleware' with express
// use takes 1 args:
// 1. the middleware you want to run - 'express.static is Awesome!'
app.use(express.static('public'));
// 1000 point to Express!













app.listen(3000);
console.log("The server is listening on port 3000...");