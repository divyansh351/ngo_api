if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const donorRoutes = require("./routes/donor");
const agentRoutes = require("./routes/agent");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const Agent = require("./models/agent");
const cors = require("cors");

const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;
// const DB_URL =
//   "mongodb+srv://divyanshgupta351:Y0YgAeSPRZQiQCMj@ngoapicluster.py7qwxt.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connection open!!!!");
});

const app = express();
const sessionOptions = {
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Agent.authenticate()));
passport.serializeUser(Agent.serializeUser());
passport.deserializeUser(Agent.deserializeUser());

app.use("/donor", donorRoutes);
app.use("/product", productRoutes);
app.use("/agent", agentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ home: "home" });
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
