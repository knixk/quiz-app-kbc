const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Sample questions
const questions = [
  { id: 1, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { id: 2, question: "Which planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter", "Venus"], answer: "Mars" },
  { id: 3, question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Shark", "Giraffe"], answer: "Blue Whale" },
  { id: 4, question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Dickens", "Austen"], answer: "Shakespeare" },
  { id: 5, question: "What is the boiling point of water?", options: ["90°C", "100°C", "120°C", "150°C"], answer: "100°C" }
];

// Store player answers
let currentQuestionIndex = 0;

// Route to get the current question
app.get('/question', (req, res) => {
  res.json(questions[currentQuestionIndex]);
});

// Route to submit the answer
app.post('/answer', (req, res) => {
  const { answer, playerName } = req.body;
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (answer === correctAnswer) {
    res.json({ message: `Congratulations ${playerName}!`, correct: true });
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length; // Move to next question
  } else {
    res.json({ message: `Incorrect answer, ${playerName}.`, correct: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
