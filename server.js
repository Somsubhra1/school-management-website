const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

require("dotenv/config");

const app = express();

const db = process.env.mongoURI;

app.set("view engine", "ejs");

// Express BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting static assets directories
app.use(express.static(path.join(__dirname, "/public")));

// Passport config
require("./middlewares/passport")(passport);

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
