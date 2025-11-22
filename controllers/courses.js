const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const result = await mongodb.getDb().db('university').collection('courses').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid contact id to find a course.' });
    }
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('university').collection('courses').find({ _id: courseId });
    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: 'Course not found.' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  // #swagger.tags = ['Courses']
  const course = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    department: req.body.department,
    instructor: req.body.instructor,
    credits: req.body.credits,
    startDate: req.body.startDate,
    maxStudents: req.body.maxStudents,
    description: req.body.description
  };
  try {
    const response = await mongodb.getDb().db('university').collection('courses').insertOne(course);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  // #swagger.tags = ['Courses']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid contact id to update a course.' });
  }
  const courseId = new ObjectId(req.params.id);
  const course = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    department: req.body.department,
    instructor: req.body.instructor,
    credits: req.body.credits,
    startDate: req.body.startDate,
    maxStudents: req.body.maxStudents,
    description: req.body.description
  };
  try {
    const response = await mongodb.getDb().db('university').collection('courses').replaceOne({ _id: courseId }, course);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  // #swagger.tags = ['Courses']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid contact id to delete a course.' });
  }
  const courseId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db('university').collection('courses').deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createCourse, updateCourse, deleteCourse };