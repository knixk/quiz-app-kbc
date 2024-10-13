import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

let data = [
    {
        "question": "who's the best dude?",
        "answer": "no",
        "answers": [
            'yes, no, maybe, pass'
        ],
        "id": 1232
    },
    {
        "question": "who's the best dude?",
        "answer": "no",
        "answers": [
            'yes, no, maybe, pass'
        ],
        "id": 12332
    },
    {
        "question": "who's the best dude?",
        "answer": "no",
        "answers": [
            'yes, no, maybe, pass'
        ],
        "id": 12352
    }
]

function App() {
    const [qr, setQr] = useState("");


    useEffect(() => {
        console.log('ue run')
    }, [])
  return (
    <div className="app__container">
        <nav className="nav">KBC Quiz</nav>
        <div className="quiz__container container">
        <div className="question__container">
        <span className="question">Q Whats up doc</span>
      </div>

      <div className="answers__container">
        <span className="answer">1. Whats up doc</span>
        <span className="answer">2. Whats up doc</span>
        <span className="answer">3. Whats up doc</span>
        <span className="answer">4. Whats up doc</span>
      </div>
        </div>

        <div className="qr__container container">
            <QRCode size={150} value={qr}></QRCode>
        </div>
    </div>
  );
}

export default App;
