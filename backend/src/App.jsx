import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {

    const checkLogin = async () => {

      const { value } = await Preferences.get({
        key: "login",
      });

      setIsLoggedIn(value === "true");

    };

    checkLogin();

  }, []);

  if (isLoggedIn === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/chat" replace /> : <Login />}
        />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/chat" replace /> : <Login />}
        />

        <Route
          path="/chat"
          element={isLoggedIn ? <Chat /> : <Navigate to="/login" replace />}
        />

        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;