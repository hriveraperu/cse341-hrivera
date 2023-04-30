const express = require('express');
var router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/contacts/', contactsController.getAll);

router.get('/contacts/:id', contactsController.getSingle);

module.exports = router;