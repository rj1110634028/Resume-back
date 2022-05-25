
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const session = require('express-session')
const passport = require('passport')
const router = require("./routes/index");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});