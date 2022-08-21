import "./login.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/");
    }
  }, []);

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
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAIL",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };
  return (
    <>
      <div className="header">
        {/*Content before waves*/}
        <div className="inner-header flex">
          {/*Just the logo.. Don't mind this*/}

          <div className="login">
            <h1>Login Here</h1>
            <div className="lContainer">
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
              {loading ? (
                <Loading />
              ) : (
                <button
                  disabled={loading}
                  onClick={(e) => handleClick(e)}
                  className="lButton"
                >
                  Login
                </button>
              )}
              {error && <span>{error.message}</span>}
            </div>
          </div>
        </div>
        {/*Waves Container*/}
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x={48}
                y={0}
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x={48}
                y={3}
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x={48}
                y={5}
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
            </g>
          </svg>
        </div>
        {/*Waves end*/}
      </div>
      {/*Header ends*/}
    </>
  );
}
