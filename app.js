const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://macho:7EfwuOmBNUmbjG2T@cluster0-gconm.mongodb.net/node-express-mongo-rest-api-boiler?w=majority';

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose
    .connect(
        MONGODB_URI
    )
    .then(
        result => {
            app.listen(3000);
            console.log('connected');
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    )