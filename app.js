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
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//EVERYTHING ABOVE IS SETTING UP FOR THINGS AND SHOULD NOT BE CHANGED
//THE ONLY THING THAT SHOULD EVER CHANG IS THE DATABASE CONNECTION
//----------------------------------------------------------------------
//----------------------------------------------------------------------

//ITS A ROUTER PARTY----------------
//These will handle get and post requests, should be only edits in this file

app.get('/michael', (req, res) => {
    
    
    var genres = con.query("select * from genre", function (err, results, fields) {
        if (err) throw err;
        console.log(results); 
    });

    res.render('michael', {genres: genres});
    

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

app.get('/games', (req, res) => {
    con.query('SELECT GAME.id, GAME.title, DEVELOPER.name, GENRE.genre FROM GAME, DEVELOPER, GENRE WHERE GAME.developer = DEVELOPER.id AND GAME.genre = GENRE.id', function (error, results, fields) {
        if (error) throw error
        console.log(results)
        res.render('games', {results})
    })
})

app.get('/games/new', (req, res) => {
    con.query('SELECT * FROM GENRE', function (error, genres, fields) {
        if (error) throw error
        con.query('SELECT * FROM DEVELOPER', function (error, developers, fields) {
            if (error) throw error
            res.render('games_new', {genres, developers})
        })
    })
})

app.post('/games/create', (req, res, next) => {
    con.query('INSERT INTO GAME SET ?', req.body, function (error, results, fields) {
        if (error) {
            next(error)
        } else {
            console.log(results)
            console.log(fields)
            res.redirect('/games/new')
        }
    })
    // con.query('SELECT * FROM GENRE', function (error, genres, fields) {
    //     if (error) throw error
    //     con.query('SELECT * FROM DEVELOPER', function (error, developers, fields) {
    //         if (error) throw error
    //         res.render('games_new', {genres, developers})
    //     })
    // })
})

//ITS A ROUTER PARTY----------------

// Handle errors
app.use((req, res, next) => {
    let err = new Error('404')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {err})
})


app.listen(port); //Starts server

/* Select all from a table code
con.query("select * from genre", function (err, results, fields) { //Gets genre types in array form
        if (err) throw err
        for (var i = 0; i < results.length; i++)//Prints out all genres
            console.log(results[i].genre);
    })
*/