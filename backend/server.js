const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

// Serve the React app
app.use(express.static(path.join(__dirname, 'client/build')));

let currentQuestionIndex = 0;
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  // Add more questions here
];

// Socket events
io.on('connection', (socket) => {
  console.log('New client connected');

  // Send current question to new clients
  socket.emit('new-question', questions[currentQuestionIndex]);

  socket.on('submit-answer', ({ playerName, answer }) => {
    if (answer === questions[currentQuestionIndex].answer) {
      io.emit('correct-answer', { playerName });
      currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
      io.emit('new-question', questions[currentQuestionIndex]);
    } else {
      socket.emit('wrong-answer', { message: 'Incorrect answer!' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/question', (req, res) => {
  res.json(questions[currentQuestionIndex]);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
