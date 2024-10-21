import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";

export const tokenId = createContext();

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <tokenId.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mydata" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </tokenId.Provider>
    </div>
  );
}

export default App;
