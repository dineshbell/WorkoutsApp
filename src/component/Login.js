import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showLoader, setShowLoader] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const changehandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setShowLoader("loading");
    await axios
      .post("https://workout-api-five.vercel.app/login", data)
      .then((res) => localStorage.setItem("token", res.data.token))
      .catch((err) => setErrorMsg(err.response.data.msg));
    setShowLoader("");
    setData({ email: "", password: "" });
  };

  if (localStorage.getItem("token")) {
    navigate("/home", { replace: true });
  }

  return (
    <Container>
      <div className={showLoader}></div>
      <form onSubmit={submithandler} className="form-container">
        <h1>Sign In</h1>
        <p>Sign into Your Account</p>
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Email Address"
          onChange={changehandler}
        />
        <br />
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="Password"
          onChange={changehandler}
        />
        <br />
        {errorMsg ? (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
        ) : null}
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span>Sign Up</span>
          </Link>
        </p>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #fffafb;

  .form-container {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 3px rgba(20, 20, 20, 0.3);
    width: 350px;
    text-align: center;
  }
  h1 {
    font-size: 50px;
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 10px;
  }

  button {
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    height: 40px;
    width: 150px;
    margin: 10px 20px 20px 0px;
  }
  input {
    height: 40px;
    margin: 5px;
    width: 280px;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid gray;
    background-color: #fffafb;
  }
  span {
    color: #0a4857;
    font-weight: bold;
  }
  .loading {
    border-top: 3px black solid;
    width: 100%;
    height: 3px;
    position: absolute;
    top: 0;
    background: #04acec;
    animation: loading 3s linear infinite;
  }
  @keyframes loading {
    from {
      left: 0%;
      width: 0;
      z-index: 100;
    }
    to {
      left: 0;
      width: 100%;
    }
  }
`;

export default Login;
