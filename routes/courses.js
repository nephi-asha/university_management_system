const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');
const { body } = require('express-validator');
const validation = require('../middleware/validate');

const courseValidation = [
    body('courseCode').trim().notEmpty().withMessage('Course Code is required'),
    body('courseName').trim().notEmpty().withMessage('Course Name is required'),
    body('credits').isInt({ min: 1, max: 5 }).withMessage('Credits must be an integer between 1 and 5'),
    body('maxStudents').isInt({ min: 1 }).withMessage('Max Students must be a positive integer'),
    body('startDate').isISO8601().toDate().withMessage('Start Date must be a valid date'),
];

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);
router.post('/', courseValidation, validation.validate, coursesController.createCourse);
router.put('/:id', courseValidation, validation.validate, coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;