import { Router } from "express";
import helmet from "helmet";
import postLoginController from "../app/controllers/postLoginController";

/**
 * @type {Router}
 */
const route = new Router();

route.use(
  helmet({
    hsts: false,
    contentSecurityPolicy: false,
  })
);

route.get("/", (req, res) => {
  res.redirect("/login");
});

route.get("/login", (req, res) => {
  res.render("index");
});

route.post("/login", postLoginController);

route.get("/home", (req, res) => {
  res.render("/home");
});

export default route;
