// Follow this
const express = require('express');
const app = express();
const helmet = require('helmet');

// Whenever I use Express, I will wear my helmet
app.use(helmet());

// Also, include all 3 of these in every app as good practice
// 1. static
// 2. json
// 3. urlencoded
app.use(express.static('public'));
// These 2 middleware actually create req.body
// They will collect any type of submitted data, parse it for you, and and give it to you in json format.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.post('/ajax', (req, res)=> {
    console.log(req.body); // thanks to the middleware above
    res.send("Test");
});

app.listen(3000);