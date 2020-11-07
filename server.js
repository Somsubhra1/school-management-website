const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv/config");

const app = express();

const db = process.env.mongoURI;

app.set("view engine", "ejs");

// Express BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting static assets directories
app.use(express.static(path.join(__dirname, "/public")));

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error connecting mongodb ` + err));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const user = {
    usertype: req.body.usertype,
    username: req.body.username,
    password: req.body.password,
  };
  console.log("register:", user);
});

app.post("/login", (req, res) => {
  const user = {
    usertype: req.body.usertype,
    username: req.body.username,
    password: req.body.password,
  };
  console.log("login:", user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
