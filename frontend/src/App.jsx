import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Client from "./pages/Client";

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

    const fetchData = async () => {
      const data2 = await fetch("/data");
      console.log(data2);
    };

    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/c" element={<Client></Client>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
