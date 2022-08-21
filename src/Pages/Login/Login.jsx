import "./login.css";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navabr/Navbar";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const naviagate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials, {
        baseURL: "https://booking-clone-app-api.herokuapp.com/api",
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      naviagate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };
  return (
    <>
      <Navbar />
      <div className="login">
        <div className="lContainer">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => handleChange(e)}
            className="lInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => handleChange(e)}
            className="lInput"
          />
          <button
            disabled={loading}
            onClick={(e) => handleClick(e)}
            className="lButton"
          >
            Login
          </button>
          <span className="errorMessage">
            {error && <span>{error.message}</span>}
          </span>
        </div>
      </div>
    </>
  );
}
