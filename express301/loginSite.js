const path = require('path');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const helmet = require('helmet');
app.use(helmet()); // HELMET MIDDLEWARE ON... READY FOR BATTLE!


app.use(express.static('public')); // SERVE UP STATIC FILES
app.use(express.json()); // JSON MIDDLEWARE
app.use(express.urlencoded()); // URLENCODED MIDDLEWARE
app.use(cookieParser()); // COOKIEPARSER MIDDLEWARE

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next)=> { // MY PERSONAL MIDDLEWARE, 'modifying the res object'
    if(req.query.msg === 'fail') {
        res.locals.msg = `Sorry this username and password combination does not exist,`;
    }else {
        res.locals.msg = ``;
    }

    // Send me on to the next piece of middleware
    next()
});


// 5 Routes
//-------------------------------------------------------------------------------------

// 1. home route
app.get('/', (req, res)=> {
    res.send('SANITY CHECK');
});

// 2. login route
app.get('/login', (req, res, next)=> {
    // the req object has query property in express
    // req.query is an object, with a property of every key in the query string
    // The query string is where you put insecure data
    // console.log(req.query);
    const msg = req.query.msg;
    if(msg === 'fail') {
        // run some function...
    }
    res.render('login');
});

// 3. process_login route
app.post('/process_login', (req, res, next)=> {
    // req.body is made by urlencoded, which parses the http message for sent data!
    const password = req.body.password;
    const username = req.body.username;
    // check the DB to see if user credntials are valid..."use bcrypt"
    // if they are valid...
    // - save their username in a cookie, so that it's readily available.. "use cookie || session...not included"
    // - send them to the welcome page
    if (password === "x") {
        // res. cookie takes atleast 2 args:
        // 1. name of the cookie
        // 2. value to set it to
        res.cookie('username', username);
        // res.redirect takes 1 arg:
        // 1.Where to send the browser
        res.redirect('/welcome');
    }else {
        // The "?" a query string, is a special character in a URL
        res.redirect('/login?msg=fail&test=hello');
    }
    // res.json(req.body);
});

// 4. welcome route
app.get('/welcome', (req, res, next)=> {
    // the req.cookies object will have a property for every named cookie that has been set
    res.render('welcome', {
        username: req.cookies.username
    });
});

// 5. logout route
app.get('/logout', (req, res, next)=> {
    // res.clearCookie takes 1 arg:
    // 1. Cookie to clear (by name)
    res.clearCookie('username');
    res.redirect('/login');
});

app.listen(3000);
console.log("Server listening on port 3000");