require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const postMiddleware = require("./middleware/middle_post");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: "farhan",
  saveUninitialized: true,
  resave: false,
}));

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.set("view engine", "ejs");




app.use("/api", require("./routes/post"));
app.use("", require("./routes/routes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
