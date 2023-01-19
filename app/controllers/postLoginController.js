import sanitize from "sanitize-html";
import * as bcrypt from "bcrypt";
import user from "../../database/user";
import sanitizeConfig from "../config/sanitize";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default function postLoginController(req, res) {
  const username = sanitize(req.body.username, sanitizeConfig.sanitizeAll);
  const password = sanitize(req.body.password, sanitizeConfig.sanitizeAll);

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
