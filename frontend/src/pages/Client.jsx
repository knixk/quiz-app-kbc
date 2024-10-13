import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Here is your toast.");

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
    id: 1232112,
  },
  {
    question: "who's the best dude?",
    answer: "no",
    answers: ["yes", "noas", "maybe", "pass"],
    id: 12331212,
  },
];

function Client() {
  const [qr, setQr] = useState("www.google.in");
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
          <div className="question__container">
            <span className="question">Q. {data[qIdx].question} </span>
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
                        {` ${idx}.`} {i}
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
                // alert("correct ans!");
                setScore((prev) => prev + 10);
              } else {
                // alert("sorry that's incorrect!");
                setScore((prev) => prev - 1);
              }
              setQIdx((prev) => prev + 1);
              notify();
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
