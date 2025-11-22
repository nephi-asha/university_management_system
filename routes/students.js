const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const { body } = require('express-validator');
const validation = require('../middleware/validate');

const studentValidation = [
    body('firstName').trim().notEmpty().withMessage('First Name is required'),
    body('lastName').trim().notEmpty().withMessage('Last Name is required'),
    body('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
    body('major').trim().notEmpty().withMessage('Major is required'),
    body('enrollmentDate').isISO8601().toDate().withMessage('Enrollment Date must be a valid date'),
    body('birthday').optional().isISO8601().toDate().withMessage('Birthday must be a valid date')
];

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);
router.post('/', studentValidation, validation.validate, studentsController.createStudent);
router.put('/:id', studentValidation, validation.validate, studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;