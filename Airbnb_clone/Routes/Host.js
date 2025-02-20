const express = require("express");
const hostRouter = express.Router();
const bodyParser = require("body-parser");
const home = require("../schema");
const userDetails = require("../Model/userDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

hostRouter.use(express.urlencoded({ extended: true }));
hostRouter.use(express.json());

hostRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userdetail = await userDetails.findOne({ username });
    if (!userdetail) {
      return res.status(400).send("Invalid userName and Password");
    }
    const isPasswordValid = await bcrypt.compare(password, userdetail.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid username or password");
    }
    const token = jwt.sign(
      { username: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.render("addHome", { pageTitle: "addHome" });
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

hostRouter.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  let hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newUserDetails = new userDetails({
    name,
    username,
    password: hashedPassword,
  });
  await newUserDetails.save();

  // save details in database
  res.send(
    `<h3>User registered successfully</h3> <a href="/login">Login Here</a>`
  );
});

hostRouter.get("/login", async (req, res) => {
  res.render("login");
});

hostRouter.get("/signup", (req, res) => {
  res.render("signup");
});

hostRouter.get("/addhome", (req, res) => {
  res.render("addHome", { pageTitle: "Add Home" });
});

hostRouter.get("/contact", authenticateToken, (req, res) => {
  res.send("Jwt");
});

hostRouter.post("/addhome", (req, res) => {
  try {
    const newHome = new home(req.body);
    const savedHome = newHome.save();
  } catch (error) {
    console.log("Error in saving Home details :", error);
  }
  res.render("homeadded", { pageTitle: "Home added", Details: req.body });
});

module.exports = { hostRouter: hostRouter };
