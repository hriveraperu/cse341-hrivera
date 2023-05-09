const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addContacts = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .insertOne(contact);
  if (response.acknowledged) {
          res.status(201).json(response);
  } else {
          res.status(500).json(response.error || 'Error: Contact was not created');
  }
};

const updateContacts = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  
  const contact = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          favoriteColor: req.body.favoriteColor,
          birthday: req.body.birthday
  };
  const response = await mongodb
          .getDb()
          .db('CSE341')
          .collection('contacts')
          .replaceOne({ _id: userId }, contact);
  // console.log(response);
  if (response.modifiedCount > 0) {
          res.status(204).send(response || 'Contact modified successfully');
  } else {
          res.status(500).json(response.error || 'Error: Contact was not updated');
  }
};

const deleteContacts = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .deleteOne({ _id: userId }, true);
  // console.log(response);
  if (response.deletedCount > 0) {
          res.status(200).send(response || 'Contact Deleted Successfully');
  } else {
          res.status(500).json(response.error || 'Error: Contact was not deleted');
  }
};

module.exports = {
  getAll,
  getSingle,
  addContacts,
  updateContacts,
  deleteContacts
};