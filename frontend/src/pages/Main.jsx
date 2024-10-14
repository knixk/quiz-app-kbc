import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import data from "../data.js";
import { nanoid } from "nanoid";
import { Navigate } from "react-router-dom";

const userId = nanoid();

function Main() {
  const [qr, setQr] = useState(userId);
  const [qIdx, setQIdx] = useState(0);

  const url = `${window.location.href}quiz/${qr}`;
  // console.log(url, "url")

  // const data3 = process.env.DEPLOYED_URL;
  // console.log(data3)

  // const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(apiUrl); // Outputs: https://api.example.com

  useEffect(() => {
    console.log("ue run");

    const fetchData = async () => {
      const data2 = await fetch("/data");
      console.log(data2);
    };

    fetchData();
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
            <div className="answers">
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
              <small>Scan code below to get started..</small>
            </div>
          </div>
        </div>
      ) : (
        <div>quiz is over</div>
      )}

      <div className="qr__container container">
        <QRCode size={150} value={url && url}></QRCode>
      </div>
    </div>
  );
}

export default Main;
