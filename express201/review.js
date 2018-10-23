// Networking = http and tcp/udp
// - stateless
// - connectionless
// - flexible

// - HTTP message
// -- start line
// --- req: GET /blog http/1.1
// --- res: http:/1.1 200 OK

// -- headers
// --- {key:value}
// ---- content-type: text/html
// ---- content-type: application/json
// ---- Cache-Control: public, max-age=0
// ---- Date: Fri, 24 Aug 2019 15:23:58 GMT

// -- BLANK LINE
// -- body
// --- STUFF - HTML, 4k video (binary), image