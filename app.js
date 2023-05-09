const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

//Import Routes
const contactRoutes = require('./routes/contacts')


app
    .use(bodyParser.json())

//ROUTES
    .use('/contacts', contactRoutes)
    

//Connect DB
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});


