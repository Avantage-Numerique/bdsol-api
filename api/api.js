const express = require('express')
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose')

const api = express();
const port = process.env.PORT || 8000;
const version = process.env.VERSION || "0.0.1";

//this is an API, but we need to have feedback on HTTP for humans et for some branding.
//api.use(express.static('public'));
//api.use('view engine', 'ejs');

const tokenSecret = process.env.JWT_KEY || 'this is secret thing you know, but it is long so this works in dev';

// Database connection.
//temp fake to have the JWT token first,
const users = [
    {
        username: 'datageek',
        email: 'datageek@test.com',
        password: '1234',
        role: 'admin'
    },{
        username: 'annamontana',
        email: 'annamontana@test.com',
        password: 'password123member',
        role: 'member'
    }
];

const permissions = [
    'read',
    'create',
    'update',
    'delete',
    'list'
];


//  Routes Middleware


//  Header CORS

api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
//api.use(express.urlencoded({extended: false}));

// parse application/json
api.use(express.json());


//  Routes GET

api.get('/', (req, res) => {
    res.send(`BDSOL API server (version ${version}) started listening on port: ${port}`)//@todo create a default get html return.
});

api.get('/ping', (req, res) => {
    res.send({
        message: "Pong",
        version: version
    });
});



//  Route POST


//  PING - PONG

api.post('/ping', (req, res) => {
    res.send({
        message: "Pong"
    });
});


//  LOGIN

api.post('/login', (req, res) => {

    const { username, password } = req.body;
    console.log(req.body);
    // add encryption on send form till checking here.
    console.log(`${username} trying to connect ...`);
    // TEMP DB BYPASS to make this working quicker.
    const user = users.find(
        u => { return u.username === username && u.password === password }
    );

    if (user) {

        console.log(`Les infomration de ${username} fonctionne, generating the JWT ...`);
        // Generate an access token
        const userConnectedToken = jwt.sign({ username: user.username,  role: user.role }, tokenSecret);

        res.json({
            userConnectedToken
        });
    } else {
        res.send({
            message: 'Vos informations de connection sont incorrect, vérifiez votre utilisateur et mot de passe.'//@todo Add this string to a string manager.
        });
    }
});


//  Listen PORT

api.listen(port, () => {
    console.log(`BDSOL API server (version ${version}) started listening on port: ${port}`);//@todo Add this string to a string manager.
});
