const express = require('express');
const router = express.Router();

const { createQuiz, getAllQuizzes, getQuizQuestions, submitQuiz } = require('../controllers/quizController');
const { addQuestion } = require('../controllers/questionController');

// Quiz Management
router.post('/quiz', createQuiz);
router.get('/quiz', getAllQuizzes);
router.get('/quiz/:quizId/questions', getQuizQuestions);

// Questions
router.post('/quiz/:quizId/question', addQuestion);

// Quiz Submissions 
router.post('/quiz/:quizId/submit', submitQuiz);

module.exports = router;
