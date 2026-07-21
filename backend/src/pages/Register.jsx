import React, { useState } from "react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Registration Successful");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="logo">🤖 Chat AI</h1>

        <h2>Create Account</h2>

        <p className="subtitle">
          Register to continue
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p className="register-text">
          Already have an account? <span>Login</span>
        </p>

      </div>
    </div>
  );
}

export default Register;