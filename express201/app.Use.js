const express = require('express');
const app = express();

// Express = 2 things
// 1. Router
// 2. Middleware that comprises a webframework

// Req ---MIDDLEWARE---> Res
// Middleware function is ANY function that has access to the req, res, and next object.



// Req ---MIDDLEWARE---> Res ------   2-4 is what the middleware will do
// 1. Request comes in
// 2. We need to validate the user, sometimes.
// 3. We need to store some things in the DB.
// 4. If there is data from the user, we need to parse it and store it
// 5. Res


// Validate User middleware method... anything that has access to req, res, and next is middleware
function validateUser(req, res, next) {
    // get info out of the request object
    // do some stuff with the DB
    res.locals.validated = true;  // Boolean set here
    console.log("VALIDATED RAN!");
    next();   // tell express to hand control off to the next middlware. If not, the process ends
};


// This will run validateUser on ALL paths, all methods!
app.use(validateUser);
// This will run validateUser on /admin, all methods!
app.use('/admin', validateUser);
// This will run ValidateUser on /, only on get methods! And, it looks like this...
app.get('/', validateUser);



// ---- Routes ----
app.get('/', (req, res, next)=> {
    res.send(`<h1>Main Page</h1>`);
    console.log(res.locals.validated); //make use of the boolean if you're on the path being used
});

app.get('/admin', (req, res, next)=> {
    res.send(`<h1>Admin Page</h1>`);
    console.log(res.locals.validated); //make use of the boolean
});

app.listen(3000);