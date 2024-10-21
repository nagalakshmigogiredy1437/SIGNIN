const express = require("express");
const mongoose = require("mongoose");
const Register = require("./model");
const app = express();
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const cors = require("cors");

// Connect to MongoDB using IPv4 address 127.0.0.1
mongoose
  .connect("mongodb://127.0.0.1:27017/local")
  .then(() => console.log("dbconnection successfully"))
  .catch((err) => console.error("db connection error:", err));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, confirmPassword } = req.body;

    let exit = await Register.findOne({ email });
    if (exit) {
      return res.status(400).send("user already exist");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("password is not matching");
    }
    await Register.create(req.body)
      .then(() => {
        res.status(200).send("register successfully");
      })
      .catch((e) => {
        return res.status(400).send("error in saving", e);
      });
  } catch (e) {
    return res.status(400).send("error in register", e);
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("data", req.body);
    const exist = await Register.findOne({ email: req.body.email });
    if (!exist) {
      return res.status(400).send("user not exist");
    }
    if (exist.password !== req.body.password) {
      return res.status(400).send("password is not matching");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };

    // Sign the JWT token
    jwt.sign(payload, "jwtsecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) {
        return res.status(400).send({ err });
      }
      return res.status(200).send({ token });
    });
  } catch (e) {
    return res.status(500).send("server error");
  }
});

app.get("/mydata", verifyToken, async (req, res) => {
  try {
    let existId = await Register.findById(req.user.id);
    if (!existId) {
      return res.status(400).send("there is no matching Id");
    }
    res.json(existId);
  } catch (e) {
    return res.status(500).send("server error");
  }
});
// Basic route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Start the server
app.listen(3000, () => {
  console.log("server running on the 3000");
});
