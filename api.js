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



