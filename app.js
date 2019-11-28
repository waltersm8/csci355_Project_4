const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "362project4"
});


const server = http.createServer((req, res) => { //Deals with everything in server connection


    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');//Sets headers needed for html / good load
  
    fs.readFile('michael.html', null, function(error, data) { //Loads an html file
        res.write(data);
        res.end();
    });



});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});