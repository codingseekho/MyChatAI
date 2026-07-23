import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

import "./App.css";

function App() {

  const isLoggedIn = localStorage.getItem("login") === "true";

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/chat" /> : <Login />}
        />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/chat" /> : <Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/chat"
          element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;