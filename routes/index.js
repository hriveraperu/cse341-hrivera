const routes = require('express').Router();
const contact = require('./contacts');

routes.use('/', require('./swagger'));
routes.use('/contacts', contact);


module.exports = routes;