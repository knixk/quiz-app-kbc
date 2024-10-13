import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import * as QRCode from 'qrcode.react';

const socket = io.connect();

function HostView() {
    const [question, setQuestion] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        socket.on('new-question', (data) => {
            setQuestion(data);
        });

        socket.on('correct-answer', (data) => {
            setWinner(data.playerName);
        });

        return () => {
            socket.off('new-question');
            socket.off('correct-answer');
        };
    }, []);

    return (
        <div>
            <h1>KBC Style Game - Host View</h1>
            {winner && <h2>Congratulations {winner}!</h2>}
            {question ? (
                <div>
                    <h2>Question: {question.question}</h2>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                    <QRCode value="http://localhost:3000/player" /> {/* Link to Player View */}
                </div>
            ) : (
                <p>Loading question...</p>
            )}
        </div>
    );
}

function PlayerView() {
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        socket.on('new-question', (data) => {
            setQuestion(data);
        });

        socket.on('wrong-answer', (data) => {
            setMessage(data.message);
        });

        return () => {
            socket.off('new-question');
            socket.off('wrong-answer');
        };
    }, []);

    const submitAnswer = () => {
        socket.emit('submit-answer', { playerName, answer });
    };

    return (
        <div>
            <h1>Player View</h1>
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

function App() {
    return (
        <Router>
            <div>
                <Link to="/host">Host</Link> | <Link to="/player">Player</Link>
                <Routes>
                    <Route path="/host" element={<HostView></HostView>} />
                    <Route path="/player" element={<PlayerView></PlayerView>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
