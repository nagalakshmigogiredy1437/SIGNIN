import React, { useState, useContext, useEffect } from "react";
import { tokenId } from "./App";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [token, setToken] = useContext(tokenId); // Assuming tokenId is a context that provides the token
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(token);
    if (token) {
      axios
        .get("http://localhost:3000/mydata", {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => setData(res.data))
        .catch((error) => {
          // Improved error handling
          console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
          );
        });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <center>
        {data ? `Welcome ${data.username}` : "Loading..."} <br />
        <button onClick={() => setToken(null)}>Logout</button>
      </center>
    </div>
  );
}

export default Profile;
