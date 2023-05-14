const express = require('express');
const cors = require('cors');
const app = express();
const mongodb = require('./db/connect');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
// const swaggerAutogen = require('swagger-autogen')();


const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

//Import Routes
const contactRoutes = require('./routes/contacts');


app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', require('./routes'))
    .use(bodyParser.json())

//ROUTES
    .use('/contacts', contactRoutes);
    

//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Connect DB
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});


