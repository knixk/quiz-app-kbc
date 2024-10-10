// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',  // Allow cross-origin requests for development
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

let questions = [
    { question: 'What is the capital of France?', options: ['London', 'Paris', 'Rome', 'Berlin'], answer: 'Paris' },
    { question: 'Who wrote Hamlet?', options: ['Charles Dickens', 'William Shakespeare', 'J.K. Rowling', 'Leo Tolstoy'], answer: 'William Shakespeare' },
    // Add more questions here...
];

let currentQuestionIndex = 0;

// Serve the current question
app.get('/question', (req, res) => {
    res.json(questions[currentQuestionIndex]);
});

// Handle real-time connections
io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);

    // Handle player submitting an answer
    socket.on('submit-answer', (data) => {
        const { answer, playerName } = data;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (answer === correctAnswer) {
            // Send a success message to the host and move to the next question
            io.emit('correct-answer', { playerName });
            currentQuestionIndex++;
        } else {
            // Notify the player that the answer is incorrect
            socket.emit('wrong-answer', { message: 'Incorrect! Try again.' });
        }
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
