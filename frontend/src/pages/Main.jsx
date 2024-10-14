import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import data from "../data.js";
import { nanoid } from "nanoid";

// generating a unique user id
const userId = nanoid();
const shortLink = 'https://bit.ly/3zVM59i';

function Main() {
  const [qr, setQr] = useState(userId);
  const [qIdx, setQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // const url = `${window.location.href}quiz/${qr}/`;

  useEffect(() => {
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
        <div className="flex__container">
          <div className="quiz__container container flex__column">
            <div className="left">
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
                  <small>Scan to get started..</small>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="qr__container container">
                <QRCode size={150} value={shortLink}></QRCode>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container end__container"></div>
      )}
    </div>
  );
}

export default Main;
