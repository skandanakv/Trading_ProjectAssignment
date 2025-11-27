import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/login", form);

      // save token to localStorage
      localStorage.setItem("token", response.data.token);
      
localStorage.setItem("broker_userId", response.data.broker_userId);
localStorage.setItem("broker_password", response.data.broker_password);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
  
        <form onSubmit={handleSubmit}>
          <input
            name="userId"
            placeholder="User ID"
            onChange={handleChange}
          />
  
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
  
          <button type="submit">Login</button>
        </form>
  
        <p>
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
