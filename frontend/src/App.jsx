function App() {
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
            QR CODE
        </div>
    </div>
  );
}

export default App;
