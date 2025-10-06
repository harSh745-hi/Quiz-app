const { quizzes, questionIdCounter } = require('../models/quizModel');

let currentQuestionId = questionIdCounter;

const addQuestion = (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.quizId));
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const { text, options } = req.body;
  if (!text || !options || options.length < 2) {
    return res.status(400).json({ error: "Invalid question or options" });
  }

  const correctOption = options.find(o => o.isCorrect);
  if (!correctOption) return res.status(400).json({ error: "At least one option must be correct" });

  const question = {
    id: currentQuestionId++,
    text,
    options: options.map((o, index) => ({ id: index + 1, text: o.text })),
    correctOptionId: options.findIndex(o => o.isCorrect) + 1
  };

  quiz.questions.push(question);
  res.json(question);
};

module.exports = { addQuestion };
