const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const {
  ensureAuthenticated,
  isGuardian,
  isAdmin,
} = require("./middlewares/auth");

require("dotenv/config");

const app = express();

const db = process.env.mongoURI;

app.set("view engine", "ejs");

// Express BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting static assets directories
app.use(express.static(path.join(__dirname, "public")));

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

// Connect flash middleware
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting Global vars for flash messages and user auth status
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error connecting mongodb ` + err));

const Notice = require("./models/Notice");
app.get("/", async (req, res) => {
  const notice = await Notice.findOne({}).sort({ date: -1 });

  console.log(notice);
  res.render("index", { notice });
});

app.use("/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(
    "/guardian",
    [ensureAuthenticated, isGuardian],
    require("./routes/guardian")
  );
  app.use(
    "/guardian/students",
    [ensureAuthenticated, isGuardian],
    require("./routes/student")
  );
  app.use(
    "/payment",
    [ensureAuthenticated, isGuardian],
    require("./routes/payment")
  );
  app.use("/admin", [ensureAuthenticated, isAdmin], require("./routes/admin"));
} else {
  app.use("/guardian", require("./routes/guardian"));
  app.use("/guardian/students", require("./routes/student"));
  app.use("/payment", require("./routes/payment"));
  app.use("/admin", require("./routes/admin"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
