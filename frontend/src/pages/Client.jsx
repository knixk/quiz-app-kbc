import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const notify = (msg) => toast(msg);
import data from "../data.js";
// import { nanoid } from 'nanoid'

function Client() {
  const [qIdx, setQIdx] = useState(0);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userId, setUserId] = useState(null);

  function checkAnswer() {
    // ans and the correct one
    const correctAns = data[qIdx].answer;
    const currentAns = data[qIdx].answers[selectedIdx];

    console.log(currentAns);

    if (correctAns == currentAns) {
      console.log("right ans");
      return true;
    }
  }

  function handleRestart() {
    setQIdx(0);
    window.location.reload();
  }

  useEffect(() => {
    console.log("ue run");

    const fetchData = async () => {
      const data2 = await fetch("/data");
      //   console.log(data2);
    };

    fetchData();
  }, []);
  return (
    <div className="app__container">
      <Toaster />
      <nav className="nav">KBC Quiz</nav>

      <div className="name__container container">
        {submit == false && (
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (name === "") {
                notify("Please enter your name...");
                return;
              }
              setSubmit(true);
            }}
          >
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="name__input"
              value={name}
              placeholder="Enter your name.."
            />
            <button>Submit</button>
          </form>
        )}
      </div>

      {qIdx <= data.length - 1 && submit ? (
        <div className="flex__container">
          <div className="quiz__container container">
            <span className="name">Name: {name}</span>
            <span className="score">Score: <span className="score__span">{score}</span> </span>
            <div className="question__container">
              <span className="question">
                {`${qIdx + 1}.`} {data[qIdx].question}{" "}
              </span>
            </div>

            <div className="answers__container">
              <div className="answers">
                {data[qIdx].answers.map((i, idx) => {
                  return (
                    <div key={idx}>
                      <input
                        type="radio"
                        id="html"
                        name="fav_language"
                        value={i}
                        onClick={() => {
                          setSelectedIdx(idx);
                        }}
                      />
                      <label htmlFor="html">
                        <span className="answer">
                          {` ${idx + 1}.`} {i}
                        </span>
                      </label>
                      <br /> <br />
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="submit__ans"
              onClick={() => {
                const ans = checkAnswer();
                if (ans) {
                  setScore((prev) => prev + 10);
                  notify("Correct Answer! +10");
                } else {
                  notify("Incorrect Answer.. -1");
                  setScore((prev) => prev - 1);
                }
                setQIdx((prev) => prev + 1);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="container end__container">
          {/* <small>Enter your name to get started...</small> */}
          {qIdx > data.length - 1 && (
            <div>
              <p>
                Final Score: <span className="score">{score}</span>
              </p>
              <p className="thanks">Thank you for playing {name}!</p>
              <small>Would you like to play again?</small>
              <button className="restart__btn" onClick={handleRestart}>
                Restart Quiz
              </button>
            </div>
          )}
          {qIdx <= data.length - 1 && (
            <small>Enter your name to get started...</small>
          )}
        </div>
      )}
    </div>
  );
}

export default Client;
