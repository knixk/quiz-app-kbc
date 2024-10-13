import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const notify = (msg) => toast(msg);
import data from "../data.js";

function Client() {
  const [qIdx, setQIdx] = useState(0);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [selectedAns, setSelectedAns] = useState("");
  const [score, setScore] = useState(0);

  function checkAnswer() {
    // ans and the correct one
    const correctAns = data[qIdx].answer;
    if (correctAns == selectedAns) {
      console.log("right ans");
      console.log(selectedAns);
      return true;
    }
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
        {submit == false ? (
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              setSubmit(true);
            }}
          >
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="name__input"
              value={name}
              placeholder="Enter your name.."
            />
            <button>Submit</button>
          </form>
        ) : (
          <span className="name">Hello, {name}</span>
        )}
      </div>

      {qIdx <= data.length - 1 && submit ? (
        <div className="quiz__container container">
          <span className="score">Score: {score}</span>
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
                      onClick={(e) => {
                        setSelectedAns(e.target.value);
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
              console.log(selectedAns)
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="container">
          <small>Enter your name to get started...</small>
        </div>
      )}
    </div>
  );
}

export default Client;
