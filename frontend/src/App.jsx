import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

let data = [
  {
    question: "who's the best dude?",
    answer: "no",
    answers: ["yes", "no", "maybe", "pass"],
    id: 1232,
  },
  {
    question: "who's the best dude?",
    answer: "no",
    answers: ["yes", "nosd", "maybe", "pass"],
    id: 12323,
  },
  {
    question: "who's the best dude?",
    answer: "no",
    answers: ["yes", "noas", "maybe", "pass"],
    id: 12312,
  },
];

function App() {
  const [qr, setQr] = useState("");
  const [qIdx, setQIdx] = useState(0);

  useEffect(() => {
    console.log("ue run");
  }, []);
  return (
    <div className="app__container">
      <nav className="nav">KBC Quiz</nav>

      {qIdx <= data.length - 1 ? (
        <div className="quiz__container container">
          <div className="question__container">
            <span className="question">Q. {data[qIdx].question} </span>
          </div>

          <div className="answers__container">
            <span className="answer">1. {data[qIdx].answers[0]} </span>
            <span className="answer">2. {data[qIdx].answers[1]}</span>
            <span className="answer">3. {data[qIdx].answers[2]}</span>
            <span className="answer">4. {data[qIdx].answers[3]}</span>
          </div>
        </div>
      ) : (
        <div>quiz is over</div>
      )}

      <div className="qr__container container">
        <QRCode size={150} value={qr}></QRCode>
      </div>
    </div>
  );
}

export default App;
