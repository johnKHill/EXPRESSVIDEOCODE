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

// home route
app.get('/', (req, res)=> {
    res.send('SANITY CHECK');
});

// login route
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

// process_login route
app.post('/process_login', (req, res, next)=> {
    // req.body is made by urlencoded, which parses the http message for sent data!
    const password = req.body.password;
    const username = req.body.username;
    // check the DB to see if user credentials are valid..."use bcrypt"
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

// welcome route
app.get('/welcome', (req, res, next)=> {
    // the req.cookies object will have a property for every named cookie that has been set
    res.render('welcome', {
        username: req.cookies.username
    });
});


// app.param() - takes 2 args:
// 1. param to look for in the route
// 2. the callback to run with the usual
app.param('id', (req, res, next, id)=> {
    console.log("Params called:" , id);
    // if id has something to do with stories...
    // if id has something to do with blog...
    next();
});


// app.get('/user/:uid,'...)
// app.get('/user/admin/:uid,'...)
// app.get('/user/profile/:uid,'...)

// in a route, anytime something has a ':' in front, it is a wildcard!
// wildcard, will match anthing in that slot
app.get('/story/:id', (req, res)=> {
    // the req.params object always exist
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId}</h1>`);
    // res.send(`<h1>Story 1</h1>`)
});


// THIS WILL NEVER RUN, BECAUSE IT MATCHES ABOVE (without next())
// app.get('/story/blogId', (req, res)=> {
//     // the req.params object always exist
//     // it will have a property for each wildcard in the route
//     res.send(`<h1>Story ${req.params.storyId}</h1>`);
//     // res.send(`<h1>Story 1</h1>`)
// });

app.get('/story/:storyId/:link', (req, res)=> {
    // the req.params object always exist
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`);
    // res.send(`<h1>Story 1</h1>`)
});


// // story 1 route
// app.get("/story/1", (req, res)=> {
//     res.send(`<h1>Story 1</h1>`)
// });

// // story 2 route
// app.get("/story/2", (req, res)=> {
//     res.send(`<h1>Story 2</h1>`)
// });

// // story 3 route
// app.get("/story/3", (req, res)=> {
//     res.send(`<h1>Story 3</h1>`)
// });

// statement route
app.get('/statement', (req, res)=> {

    // This will render the statement in the browser - what we don't want
    // res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'));
    // app has a download method! Takes 2 args:
    // 1.filename
    // 2. optionally, what you want the file name to download as
    // 3. callback which comes with a error object

    // download is setting the headers!
    // 1. content-disposition to attachment, with a filename of the seconf arg
    res.download(path.join(__dirname, 'userStatements/BankStatementChequing.png'), 'JimsStatement.png', (error)=> {
        // If there is an error in sending the File, headers may already be sent
        if (error) {
            // res.headersSent is a Boolean, true if headers are already sent i.e. don't try to senf them again
            if (!res.headersSent)
            res.redirect('/download/error');
        }
    });

    // attachment ONLY sets the headers to attachment
    // IF, you provide a File, it will also set the file
    // it's there in case you need it, but use download
    // res.attachment(path.join(__dirname, 'userStatements/BankStatementChequing.png'), 'JimsStatement.png');

    // // setting headers manually - don't do this, use download
    // res.set('Content-Disposition', 'attachment')
    // res.sendFile

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