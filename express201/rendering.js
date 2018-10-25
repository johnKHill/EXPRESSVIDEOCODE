const express = require('express');
const app = express();
const path = require('path');


const helmet = require('helmet');
app.use(helmet());  // HELMET ON... READY FOR BATTLE!

// serve up static files
app.use(express.static('public'));
// parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());

// very important
// app.set(), takes 2 args:
// 1. key
// 2. value
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1. Express as we know it happens. This File
// 2. We define a view engine.
// - EJS
// - Mustache
// - Handlebars
// - Jade/Pug
// 3. Inside one of our routes, we have a res.render
// 4. We pass the res.render 2 things:
// - the file we want to use.
// - the data we want to send to that file
// 5. Express uses the node module (ejs, handlebars, etc.) for our speciified view engine and parses the file
// - that means, it takes the HTML/CSS/JS and combines it with whatever "node" there is in the file.
// 6. The final result of this process is a compiled product of the things the browser can read
// - HTML, JS and CSS.

app.get('/', (req, res, next)=> {
    res.render("index");
});

app.listen(3000);
