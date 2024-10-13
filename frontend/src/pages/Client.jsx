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

function Client() {
  const [qr, setQr] = useState("www.google.in");
  const [qIdx, setQIdx] = useState(0);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);

  function checkAnswer(qID, ans) {}

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
              {data.map((i) => {
                return (
                  <div key={i.id}>
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                    />
                    <label htmlFor="html">
                      <span className="answer">
                        1. {data[qIdx].answers[0]}{" "}
                      </span>
                    </label>
                    <br /> <br />
                  </div>
                );
              })}
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label htmlFor="html">
                <span className="answer">1. {data[qIdx].answers[0]} </span>
              </label>
              <br /> <br />
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label htmlFor="html">
                <span className="answer">2. {data[qIdx].answers[1]}</span>
              </label>
              <br /> <br />
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label htmlFor="html">
                <span className="answer">3. {data[qIdx].answers[2]}</span>
              </label>
              <br /> <br />
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label htmlFor="html">
                <span className="answer">4. {data[qIdx].answers[3]}</span>
              </label>
              <br /> <br />
            </div>
          </div>

          <button
            className="submit__ans"
            onClick={() => {
              console.log("clicked");
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Client;
