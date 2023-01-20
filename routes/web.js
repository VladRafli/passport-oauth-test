const { Router } = require("express");
const helmet = require("helmet");
const passport = require("passport");
const postLoginController = require("../app/controllers/postLoginController.js");

/**
 * @type {Router}
 */
const route = new Router();

route.get("/", (req, res) => {
  res.redirect("/login");
});

route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/login", postLoginController);

route.get("/login/google", (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] });
});

route.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/home");
  }
);

route.get("/home", (req, res) => {
  res.render("/home");
});

module.exports = route;
