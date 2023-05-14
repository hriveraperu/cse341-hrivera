const express = require('express');
var router = express.Router();

const contactsController = require('../controllers/contacts');


router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.addContacts);

router.put('/:id', contactsController.updateContacts);

router.delete('/:id', contactsController.deleteContacts);



module.exports = router;