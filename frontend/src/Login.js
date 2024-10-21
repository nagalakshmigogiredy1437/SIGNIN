import axios from "axios";
import React, { useState, useContext } from "react";
import { tokenId } from "./App";
import { Navigate } from "react-router-dom";

function Login() {
  const [token, setToken] = useContext(tokenId);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log("data", data);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("data", data);
    axios
      .post("http://localhost:3000/login", data)
      .then((res) => setToken(res.data.token))
      .catch((e) => console.log("error", e));
  };
  if (token) {
    return <Navigate to="/mydata"></Navigate>;
  }
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <h3>Login</h3>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Enter email"
          ></input>
          <br />
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            placeholder="Enter password"
          ></input>
          <br />
          <input type="submit" value="Login"></input>
        </form>
      </center>
    </div>
  );
}

export default Login;
