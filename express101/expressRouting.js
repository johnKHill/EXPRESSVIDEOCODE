const express = require('express');
const app = express();

// app object has a few methods:
// ------------------------------
// HTTP verbs! REST verbs!
// CRUD app cooresponence!
// These are the main HTTP verbs and the main rest verbs
// -------------------------------------------------
// 1. get - READ
// - Default for all browser is get. It always makes a get request by default
// 2. post - CREATE
// 3. delete - DELETE
// 4.put - UPDATE
// 5. all - I will accept any method (it's an express thing only)

// All these methods take 2 args:
// 1. path
// 2. callback to run if an HTTP request that matches THIS verb is made to the path in #1

// app.all listens for 'any' HTTP traffic
// app.all('/', (req, res)=> {
//     res.send(`<h1>Welcome to the home page!</h1>`);
// });

app.get('/',(req, res)=> {
    console.log(req);
    res.send(`<h1>Welcome to the home GET page!</h1>`);
});


app.post('/',(req, res)=> {
    res.send(`<h1>Welcome to the home POST page!</h1>`);
});


app.delete('/',(req, res)=> {

});


app.put('/',(req, res)=> {

});




app.listen(3000);
console.log("The server is listening on port 3000...");