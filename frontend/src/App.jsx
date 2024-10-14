import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Client from "./pages/Client";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/quiz" element={<Client></Client>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
