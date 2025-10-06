function calculateScore(quiz, submittedAnswers) {
  let score = 0;
  submittedAnswers.forEach(answer => {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    if (!question) return;
    if (question.correctOptionId === answer.optionId) {
      score++;
    }
  });
  return { score, total: quiz.questions.length };
}

module.exports = { calculateScore };
