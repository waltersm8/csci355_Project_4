require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
const port = 8080;

// Disables view cache, data might have updated since then
app.disable('view cache')

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
        //console.log(results);
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

//--------------------------------
//Juans Create Pages--------------
app.get('/juan', (req, res) => {
    con.query("select * from USER", function (err, users, fields) {
        if (err) {
            next(err);
        }
        con.query("select * from GAME", function (err, games, fields) {
            if (err) 
            {
                next (err);
            }
            console.log(games);
            res.render('user_game', {users: users, games: games});
            res.end();
        });
    });
});

app.post('/addUserGame', (req, res) => {
    con.query("insert into USER_GAMES set ?", req.body, function (err, results, fields) {
        if (err) throw err;

        res.redirect('/juan');
    });
});

//Juans Create Pages--------------
//--------------------------------

//Juan Show Pages

app.get('/showUserGames', (req, res) => {
    con.query("select * from USER_GAMES join USER on USER.id = USER_GAMES.user join GAME on USER_GAMES.game = GAME.id", function (err, results, fields) {
        if (err) throw err;

        console.log(results);
        res.render('showUserGames', {list: results});
        res.end();
    });
});

//Juan Show pages

//Juan Delete and Update Page

app.get('/updateUserGame/:user/:game', (req, res) =>{
    var user = req.params.user;
    var game = req.params.game;

    console.log(user + game);


    con.query("select * from USER_GAMES join USER on USER.id = USER_GAMES.user join GAME on USER_GAMES.game = GAME.id where user= ? and game= ?", [user, game], function (err, currentField, fields) {
        if (err) throw err;

        console.log(currentField);
    con.query("select * from USER_GAMES join USER on USER.id = USER_GAMES.user join GAME on USER_GAMES.game = GAME.id", [user, game], function (err, results, fields) {
        if (err) throw err;

        //console.log(results);
        res.render('updateuserGame', {results: results, currUser: user, currGame: game, currentField: currentField});
        res.end(); 
        });
    });
}); 

app.get('/deleteUserGame/:user/:game', (req, res) =>{
    var user = req.params.user;
    var game = req.params.game;

    console.log(user + game);

    con.query("delete from USER_GAMES where user= ? and game= ?", [user, game], function (err, results, fields) {
        if (err) throw err;

        //console.log(results);
        res.redirect('/showUserGames');
        res.end();
    });
}); 

//Juan Delete and update Page


//Bleep bloop this is michaels home file for genre and developer
app.get('/michael', (req, res) => {
    res.render('michael');
    res.end();
});

//------------------
//------------------
//Show for michael
//------------------
//------------------

app.get('/showDevs', (req, res) => {
    con.query("select * from DEVELOPER", function (err, results, fields) {
        if (err) throw err;
        //console.log(results); 

        res.render('show_devs', {names: results});
    });
});

app.get('/showGenres', (req, res) => {
    con.query("select * from GENRE", function (err, results, fields) {
        if (err) throw err;
        //console.log(results); 

        res.render('show_genres', {genres: results});
    });
});

//------------------
//------------------
//Delete for michael
//------------------
//------------------

app.post('/dev/delete', (req, res) => {
    con.query("delete from DEVELOPER where id= ?", req.body.id, function (err, results, fields) {
        if (err) {
            next(err)
        } else {
            notifier.notify({
                'title': 'Success!',
                'subtitle': 'Deletion Completed', 
                'message': 'Item has been deleted!',
                'icon': 'public/images/check_img.png'
            });
        //console.log(results);
        }
        res.redirect('/showDevs');
    });
});

app.post('/genre/delete', (req, res) => {
    con.query("delete from GENRE where id= ?", req.body.id, function (err, results, fields) {
        if (err) {
            next(err)
        } else {
            notifier.notify({
                'title': 'Success!',
                'subtitle': 'Deletion Completed', 
                'message': 'Item has been deleted!',
                'icon': 'public/images/check_img.png'
            });
        //console.log(results);
        }
        res.redirect('/showGenres');
    });
});

//------------------
//------------------
//Update for michael
//------------------
//------------------

app.get('/genre/update/:id', (req, res, next) => {

    con.query("select genre from GENRE where id= ?", req.params.id, function (err, results, fields) {
        if (err) {
            next(err)
        } else {
        //console.log(results);
        }
        res.render('genre_update', {genre: results, id: req.params.id});
    });
});

app.post('/genre/update', (req, res, next) => {
    con.query("update GENRE set ? where id= ?", [req.body, req.body.id], function (err, results, fields) {
        if (err) {
            notifier.notify({
                'title': 'Insertion Error',
                'subtitle': 'Insertion Failed', 
                'message': 'Please check that the item you are changing to does not already exist or contain invalid chracters.',
                'icon': 'public/images/x_img.png'
            });
            next(err)
        } else {
            notifier.notify({
                'title': 'Success!',
                'subtitle': 'Change Completed', 
                'message': req.body.genre + ' has been changed!',
                'icon': 'public/images/check_img.png'
            });
        //console.log(req.body);
        //console.log(req.body.id);
        }
    });

    res.redirect('/showGenres');
});
 
//Visual break

app.get('/dev/update/:id', (req, res, next) => {

    con.query("select name from DEVELOPER where id= ?", req.params.id, function (err, results, fields) {
        if (err) {
            next(err)
        } else {
        //console.log(results);
        }
        res.render('dev_update', {name: results, id: req.params.id});
    });
});

app.post('/dev/update', (req, res, next) => {
    con.query("update DEVELOPER set ? where id= ?", [req.body, req.body.id], function (err, results, fields) {
        if (err) {
            notifier.notify({
                'title': 'Insertion Error',
                'subtitle': 'Insertion Failed', 
                'message': 'Please check that the item you are changing to does not already exist or contain invalid chracters.',
                'icon': 'public/images/x_img.png'
            });
            next(err)
        } else {
            notifier.notify({
                'title': 'Success!',
                'subtitle': 'Change Completed', 
                'message': req.body.genre + ' has been changed!',
                'icon': 'public/images/check_img.png'
            });
        //console.log(req.body);
        //console.log(req.body.id);
        }
    });

    res.redirect('/showDevs');
});

//------------------
//------------------
//Add for michael
//------------------
//------------------

const notifier = require('node-notifier');
/* Popup notifications!
notifier.notify({
    'title': 'title',
    'subtitle': 'subtitle', 
    'message': 'message'
});
*/

app.post('/addGenre', (req, res, next) => {
    if(req.body.genre != "")
    {
        con.query("insert into GENRE (genre) values (?)", req.body.genre, function (err, results, fields) {
            if (err) {
                notifier.notify({
                    'title': 'Insertion Error',
                    'subtitle': 'Insertion Failed', 
                    'message': 'Please check that the item you are inserting does not already exist or contain invalid chracters.',
                    'icon': 'public/images/x_img.png'
                });
                res.redirect('/michael');
                next(err);
            } else {
                notifier.notify({
                    'title': 'Success!',
                    'subtitle': 'Insertion Completed', 
                    'message': req.body.genre + ' has been inserted!',
                    'icon': 'public/images/check_img.png'
                });
                //console.log(results);
                res.redirect('/michael');
            }
        });
    }
    else
        res.redirect('/michael');
    
});

app.post('/addDev', (req, res, next) => { 
    console.log(req.body.dev);
    if(req.body.dev != "")
    {
        con.query("insert into DEVELOPER (name) values (?)", req.body.dev, function (err, results, fields) {
            if (err) {
                notifier.notify({
                    'title': 'Insertion Error',
                    'subtitle': 'Insertion Failed', 
                    'message': 'Please check that the item you are inserting does not already exist or contain invalid characters.',
                    'icon': 'public/images/x_img.png'
                });
                res.redirect('/michael');
                next(err)
            } else {
                notifier.notify({
                    'title': 'Success!',
                    'subtitle': 'Insertion Completed', 
                    'message': req.body.dev + ' has been inserted!',
                    'icon': 'public/images/check_img.png'
                });
                console.log(results);
                res.redirect('/michael');
            }
        });
    }
    else
        res.redirect('/michael');
});

//---------------------------------------------------
//---------------------------------------------------
//Ethans stuff bellow--------------------------------
//---------------------------------------------------
//---------------------------------------------------

app.get('/games', (req, res) => {
    con.query('SELECT GAME.id, GAME.title, GAME.ageLimit, DEVELOPER.name, GENRE.genre FROM GAME, DEVELOPER, GENRE WHERE GAME.developer = DEVELOPER.id AND GAME.genre = GENRE.id', function (error, results, fields) {
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
            res.redirect('/games')
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

app.get('/games/update/:id', (req, res) => {
    con.query('SELECT * FROM GENRE', function (error, genres, fields) {
        if (error) throw error
        con.query('SELECT * FROM DEVELOPER', function (error, developers, fields) {
            if (error) throw error
            con.query('SELECT * FROM GAME WHERE id = ?', req.params.id, function (error, results, fields) {
                if (error) throw error
                res.render('games_update', {genres, developers, results})
            })
            
        })
    })
})

app.post('/games/update/', (req, res, next) => {
    con.query('UPDATE GAME SET ? WHERE id = ?', [req.body, req.body.id], function (error, results, fields) {
        if (error) {
            next(error)
        } else {
            console.log(results)
            console.log(fields)
            res.redirect('/games')
        }
    })
})

app.post('/games/delete', (req, res, next) => {
    con.query('DELETE FROM GAME WHERE id = ?', req.body.id, function (error, results, fields) {
        if (error) {
            next(error)
        } else {
            console.log(results)
            console.log(fields)
            res.redirect('/games')
        }
    })
})

//ITS A ROUTER PARTY----------------

// Handle 404 and other errors
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

/*
             _____________________________________________________
            /                                                      \
           |    _______________________________________________     |
           |   |                                               |    |
           |   |  C:\> nodemon app.js                          |    |
           |   |  [nodemon] 2.0.1                              |    |
           |   |  [nodemon] to restart at any time, enter 'rs' |    |
           |   |  [nodemon] watching dir(s): *.*               |    |
           |   |  [nodemon] watching extensions: js,mjs,json   |    |
           |   |  [nodemon] starting `node app.js`             |    |
           |   |  _                                            |    |
           |   |                                               |    |
           |   |                                               |    |
           |   |                                               |    |
           |   |                                               |    |
           |   |                                               |    |
           |   |_______________________________________________|    |
           |                                                        |
            \_______________________________________________________/
                   \_________________________________________/
                   ___________________________________________
                _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_
             _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.`-_
          _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-`__`. .-.-.-.`-_
       _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.`-_
    _-'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.`-_
   :-------------------------------------------------------------------------:
   `---._.-------------------------------------------------------------._.---'
*/
