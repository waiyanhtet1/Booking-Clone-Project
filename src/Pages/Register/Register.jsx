import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../Components/Navabr/Navbar";
import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios.post("/auth/register", data, {
      baseURL: "https://booking-clone-app-api.herokuapp.com/api",
    });
    navigate("/login");
  };
  console.log(errors);

  return (
    <div>
      <Navbar />
      <div
        className={`register ${Object.values(errors).length > 0 && "error"}`}
      >
        <div className="registerContainer">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formControl">
              <input
                type="text"
                placeholder="UserName"
                {...register("username", {
                  required: "Fill UserName!",
                  min: 3,
                  maxLength: 80,
                })}
              />
              <span className="errorMessage">
                {errors.username && errors.username.message}
              </span>
            </div>
            <div className="formControl">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Fill Email!",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <span className="errorMessage">
                {errors.email && errors.email.message}
              </span>
            </div>
            <div className="formControl">
              <input
                type="tel"
                placeholder="Mobile number"
                {...register("phone", {
                  required: "Fill Phone!",
                  min: 10,
                  maxLength: 12,
                })}
              />
              <span className="errorMessage">
                {errors.phone && errors.phone.message}
              </span>
            </div>
            <div className="formControl">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Fill Password!",
                  min: 4,
                })}
              />
              <span className="errorMessage">
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="formControl">
              <input
                type="text"
                placeholder="City"
                {...register("city", { required: "Fill City!" })}
              />
              <span className="errorMessage">
                {errors.city && errors.city.message}
              </span>
            </div>
            <div className="formControl">
              <input
                type="text"
                placeholder="Country"
                {...register("country", {
                  required: "Fill Country!",
                  maxLength: 100,
                })}
              />
              <span className="errorMessage">
                {errors.country && errors.country.message}
              </span>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
