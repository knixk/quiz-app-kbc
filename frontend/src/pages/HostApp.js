// HostApp.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import QRCode from 'qrcode.react';

const socket = io('http://localhost:5000'); // Replace with your backend URL

function HostApp() {
    const [question, setQuestion] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        // Fetch the first question from the backend
        fetch('http://localhost:5000/question')
            .then((response) => response.json())
            .then((data) => setQuestion(data));

        // Listen for a correct answer
        socket.on('correct-answer', (data) => {
            setWinner(data.playerName);
            // Fetch the next question after a correct answer
            fetch('http://localhost:5000/question')
                .then((response) => response.json())
                .then((data) => setQuestion(data));
        });

        return () => {
            socket.off('correct-answer');
        };
    }, []);

    return (
        <div>
            <h1>KBC Style Game</h1>
            {winner && <h2>Congratulations {winner}!</h2>}
            {question ? (
                <div>
                    <h2>Question: {question.question}</h2>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                    {/* Display the QR code */}
                    <QRCode value="http://localhost:3001/player" />
                    <p>Scan the QR code to join the game</p>
                </div>
            ) : (
                <p>Loading question...</p>
            )}
        </div>
    );
}

export default HostApp;
