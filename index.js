const bcrypt = require("bcrypt");
const cors = require("cors");
const env = require("dotenv");
const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const user = require("./database/user.js");
const webRoutes = require("./routes/web.js");
const initPassportGoogleStrategy = require('./framework/passportGoogle')
// Set environment variables
env.config();
// Seed memory database
user.push({
  id: user.length + 1,
  username: "admin",
  password: bcrypt.hashSync("admin", bcrypt.genSaltSync()),
  accountType: "local",
  name: "Admin",
});

const app = express();

initPassportGoogleStrategy()

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.engine(".hbs", hbs.engine({ defaultLayout: false, extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(webRoutes);
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is started on http://localhost:${process.env.PORT}`)
);
