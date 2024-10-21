import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    console.log("register", data);
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", data)
      .then((res) => alert(res.data));
  };
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <h3>Register</h3>
          <input
            type="text"
            name="username"
            onChange={changeHandler}
            placeholder="Enter username"
          ></input>
          <br />
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
          <input
            type="password"
            name="confirmPassword"
            onChange={changeHandler}
            placeholder="Enter confirm password"
          ></input>
          <br />
          <input type="submit" value="Register"></input>
        </form>
      </center>
    </div>
  );
}

export default Register;
