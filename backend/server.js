const express = require("express");
const app = express();
const port = 5000;

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

app.listen(port, () => {
  console.log(`server running on port ${port}`);

  app.get("/", (req, res) => {
    res.send(data);
  });

  app.get("/questions", (req, res) => {
    res.send(data);
  });

  app.post("/check", (req, res) => {
    res.send("done");
  });
});
