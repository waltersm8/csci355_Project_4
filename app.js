const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

var mysql = require('mysql');

var con = mysql.createConnection({ //COnnects to sql database
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "362project4"
});

con.connect(function(err) { //Runs show tables on database
    if (err) throw err;
    con.query("show tables", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
    });
});

const server = http.createServer((req, res) => { //Deals with everything in server connection

    
        console.log('Home Page');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');//Sets headers needed for html / good load
  
    if(req.url == '/michael')
    {
        fs.readFile('michael.html', null, function(error, data) { //Loads an html file
            res.write(data);
            res.end();
        });
    }
    else
    {
        res.write('No Page Here For ');
        res.write('<a href="michael">Michael</a>');
        res.end();
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});