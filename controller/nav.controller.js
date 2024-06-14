import { body } from "../utils/body.js";
import fs from "node:fs";
import path from "node:path";
import { dashboard } from "../utils/dashboard.js";

const cwd = process.cwd();
const viewPath = path.join(cwd, "view");

const nav = fs.readFileSync(path.join(viewPath, "nav.html"), {
  encoding: "utf8",
});
const loginForm = fs.readFileSync(path.join(viewPath, "login.html"), {
  encoding: "utf8",
});
const registerForm = fs.readFileSync(path.join(viewPath, "register.html"), {
  encoding: "utf8",
});

export function getLoginForm(req, res) {
  const nav = fs.readFileSync(path.join(viewPath, "nav.html"), {
    encoding: "utf8",
  });

  const html = body(nav + loginForm);
  res.status(200).send(html);
}

export function getRegisterForm(req, res) {
  const html = body(nav + registerForm);
  res.status(200).send(html);
}

export function getDashboard(req, res) {
  const html = body(nav + dashboard(req.session.user));
  res.status(200).send(html);
}
