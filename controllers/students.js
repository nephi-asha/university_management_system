const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    const result = await mongodb.getDb().db('university').collection('students').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid student id to find a student.' });
    }
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('university').collection('students').find({ _id: studentId });
    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: 'Student not found.' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  // #swagger.tags = ['Students']
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    major: req.body.major,
    enrollmentDate: req.body.enrollmentDate,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db('university').collection('students').insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  // #swagger.tags = ['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid student id to update a student.' });
  }
  const studentId = new ObjectId(req.params.id);
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    major: req.body.major,
    enrollmentDate: req.body.enrollmentDate,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db('university').collection('students').replaceOne({ _id: studentId }, student);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  // #swagger.tags = ['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid student id to delete a student.' });
  }
  const studentId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db('university').collection('students').deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createStudent, updateStudent, deleteStudent };