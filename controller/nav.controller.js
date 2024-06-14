import { body } from "../utils/body.js";
import fs from "node:fs";
import path from "node:path";
import { dashboard } from "../utils/dashboard.js";
import { message } from "../utils/message.js";

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

function renderPage(req, res, contentHtml) {
  let messageHtml = "";
  console.log(req.session.message);
  if (req.session.message) {
    messageHtml = message(req.session.message);
    req.session.message = null;
  }
  const html = body(nav + messageHtml + contentHtml);
  res.status(200).send(html);
}

export function getLoginForm(req, res) {
  renderPage(req, res, loginForm);
}

export function getRegisterForm(req, res) {
  renderPage(req, res, registerForm);
}

export function getDashboard(req, res) {
  const dashboardHtml = dashboard(req.session.user);
  renderPage(req, res, dashboardHtml);
}
