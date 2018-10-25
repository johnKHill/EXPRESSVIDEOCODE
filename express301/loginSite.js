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


// Routes
//-------------------------------------------------------------------------------------

// home route
app.get('/', (req, res)=> {
    res.send('SANITY CHECK');
});

// login route
app.get('/login', (req, res, next)=> {
    res.render('login')
});

// process_login route
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
        res.redirect('/login?msg=fail');
    }
    // res.json(req.body);
});

// welcome route
app.get('/welcome', (req, res, next)=> {
    // the req.cookies object will have a property for every named cookie that has been set
    res.render('welcome', {
        username: req.cookies.username
    });
});

// logout route
app.get('/logout', (req, res, next)=> {
    // res.clearCookie takes 1 arg:
    // 1. Cookie to clear (by name)
    res.clearCookie('username');
    res.redirect('/login');
});

app.listen(3000);
console.log("Server listening on port 3000");