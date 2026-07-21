import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("login", "true");

  alert("Login Successful");

  navigate("/chat");
};

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="ai-header">

  <div className="ai-icon">
  </div>

  <h1>Chat AI</h1>

</div>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

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
  Login
</button>


<br />
<br />
<br />


<button
  type="button"
  onClick={()=>{
    localStorage.removeItem("login");

    setEmail("");
    setPassword("");

    alert("Logout Successful");
  }}
>
  Logout
</button>

        </form>

      </div>
    </div>
  );
}

export default Login;