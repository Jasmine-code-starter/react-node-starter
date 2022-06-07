import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/not-found/not-found";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
