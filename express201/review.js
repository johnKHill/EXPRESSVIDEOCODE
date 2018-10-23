// Networking = http and tcp/udp
// - stateless
// - connectionless
// - flexible


// ---- HTTP message --------------------------------------------------------
// -- start line --------
// --- req: GET /blog http/1.1
// --- res: http:/1.1 200 OK

// -- headers -----------
// --- {key:value}
// ---- content-type: text/html
// ---- content-type: application/json
// ---- Cache-Control: public, max-age=0
// ---- Date: Fri, 24 Aug 2019 15:23:58 GMT

// -- BLANK LINE ---------

// -- body ---------------
// --- STUFF - HTML, 4k video (binary), image



// ------ Nodeserver ------------------------------------------------------------
// - write headers
// - write body
// -- used the fs module
// - close connection
// - server.listen
// -- 3000
// -- req, res  - when it comes to dealing with http messages



// ------ Express version --------------------------------------------------------
// - Express IS Nodejs
// - app === express() === createApplication()
// - server ---> app.listen
// - router
// - app.get, app.post, app.all, etc.
// - served up static files with express.static() middleware


// ------ 201 section -------------------------------------------------------------
// - Middleware = any function that has access to req, res, and next
// - networking on the outside, node/express development on the inside
// -- app.use, anytime you see a callback/function (req, res, next)=>
// --- express.json() ---> body parser ---> creates req.body
// --- express.urlencoded() ---> body parser ---> creates req.body
// --- helmet() -- 3rd party module/middleware that writes/saves stuff to the header to avoid attackers --> ALWAYS USE
// --- next() is the way to move a piece of middleware forward
// Request ---------
// - req.ip - contains the requesters ip
// - req.path - contains the requested path
// - req.body- parsed data
// Response ---------
// - res.send (.end()) - send text/html
// - res.sendFile - send a file!
// - res.locals - is available through the res circle
// - res.json (jsonp) - send json back as application/json
