import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul>
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
