const { quizzes, quizIdCounter } = require('../models/quizModel');

let currentQuizId = quizIdCounter;

exports.createQuiz = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const quiz = {
    id: currentQuizId++,
    title,
    questions: []
  };
  quizzes.push(quiz);
  res.json(quiz);
};

exports.getAllQuizzes = (req, res) => {
  const allQuizzes = quizzes.map(q => ({ id: q.id, title: q.title }));
  res.json(allQuizzes);
};

exports.getQuizQuestions = (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.quizId));
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  
  const questions = quiz.questions.map(q => ({
    id: q.id,
    text: q.text,
    options: q.options.map(o => ({ id: o.id, text: o.text }))
  }));

  res.json(questions);
};




const { calculateScore } = require('../services/scoringService');

const submitQuiz = (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.quizId));
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const { answers } = req.body;
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Answers must be an array" });
  }

  const result = calculateScore(quiz, answers);
  res.json(result);
};

module.exports.submitQuiz = submitQuiz;
