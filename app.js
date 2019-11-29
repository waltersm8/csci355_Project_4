const express = require('express');
const path = require('path');
const app = express();
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

app.use(express.static('public'));

app.set('views', path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/michael', (req, res) => {
  res.render('michael');
});

app.listen(port);