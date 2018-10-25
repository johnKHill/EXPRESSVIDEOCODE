const express = require('express');
const app = express();
const path = require('path');


const helmet = require('helmet');
app.use(helmet()); // HELMET ON... READY FOR BATTLE!

// serve up static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


function validateUser(req, res, next) {
    // ... validayed logic
    res.locals.validated = true;
    next();
}

app.use(validateUser);


// Routes
app.get('/about', (req, res) => {
    res.render('about', {});
});


app.get('/', (req, res, next) => {
    // the data in the second arg is going to be appended to res.local
    res.render("index", {
        countries: [{
            name: 'Russia',
            capitol: "Moscow",
            western: false
        },
        {
            name: 'England',
            capitol: "London",
            western: true
        }],
        msg: "Failure!",
        msg2: "Success!",
        // HTML came from the DB and we want to drop it in the template
        html: `<p><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a20bc6324f6ef2969d9a7cae56b8d4d1&auto=format&fit=crop&w=300&q=60" /></p>`
    });
});


app.listen(3000);