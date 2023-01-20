const sanitize = require("sanitize-html");
const bcrypt = require("bcrypt");
const user = require("../../database/user.js");
const { sanitizeAll } = require("../config/sanitize.js");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports = function postLoginController(req, res) {
  const username = sanitize(req.body.username, sanitizeAll);
  const password = sanitize(req.body.password, sanitizeAll);

  if (user.findIndex((val) => val.username === username) === -1) {
    res.render("login", { error: "Wrong credentials" });
    return;
  }

  const currentUser = user.find((val) => val.username === username);

  if (!bcrypt.compareSync(password, currentUser.password)) {
    res.render("login", { error: "Wrong credentials" });
    return;
  }

  res.redirect("/home");
}
