// PlayerApp.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

function PlayerApp() {
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        // Fetch the question from the backend when the player joins
        fetch('http://localhost:5000/question')
            .then((response) => response.json())
            .then((data) => setQuestion(data));

        // Listen for wrong answer feedback
        socket.on('wrong-answer', (data) => {
            setMessage(data.message);
        });

        return () => {
            socket.off('wrong-answer');
        };
    }, []);

    const submitAnswer = () => {
        socket.emit('submit-answer', { answer, playerName });
    };

    return (
        <div>
            <h1>Welcome, {playerName || 'Player'}</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            {question ? (
                <div>
                    <h2>Question: {question.question}</h2>
                    {question.options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            {option}
                        </div>
                    ))}
                    <button onClick={submitAnswer}>Submit Answer</button>
                </div>
            ) : (
                <p>Loading question...</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default PlayerApp;
