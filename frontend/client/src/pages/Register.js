import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
    email: "",
    mobile: "",
    broker_userId: "",
    broker_password: "",
    otp: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", form);

    try {
      const response = await api.post("/register", form);
      // Save broker creds for connect-broker
localStorage.setItem("broker_userId", form.broker_userId);
localStorage.setItem("broker_password", form.broker_password);


      alert("Registered Successfully");
      
      navigate("/"); // go to login page
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input name="userId" placeholder="User ID" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="mobile" placeholder="Mobile" onChange={handleChange} />
          <input name="broker_userId" placeholder="Broker User ID" onChange={handleChange} />
          <input name="broker_password" type="password" placeholder="Broker Password" onChange={handleChange} />
          <input name="otp" placeholder="OTP" onChange={handleChange} />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}


export default Register;