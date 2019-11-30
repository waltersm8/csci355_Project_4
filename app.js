require('dotenv').config()

const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
const port = 8080;

var mysql = require('mysql');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({ //COnnects to sql database
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

con.connect(function(err) { //Runs show tables on database
    if (err) throw err;
    con.query("show tables", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
    });
});

app.set('views', path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//ITS A ROUTER PARTY----------------

app.get('/michael', (req, res) => { 
  res.render('michael');
  res.end();
});

app.post('/addGenre', (req, res) => {
    var newGenre = req.body.genre;

    console.log(newGenre);

        con.query("insert into genre (genre) values ('"+newGenre+"')", function (err, results, fields) {
            if (err) throw err;
            console.log(results);
        });     

    res.redirect('/michael');
    res.end();
});

app.post('/addDev', (req, res) => {
    var newDev = req.body.dev;
    
    console.log(newDev);

    con.query("insert into developer (name) values ('"+newDev+"')", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
    });  

    res.redirect('/michael');
    res.end();
});

//ITS A ROUTER PARTY----------------

app.listen(port);

/* Select all from a table code
con.query("select * from genre", function (err, results, fields) { //Gets genre types in array form
        if (err) throw err
        for (var i = 0; i < results.length; i++)//Prints out all genres
            console.log(results[i].genre);
    })
*/