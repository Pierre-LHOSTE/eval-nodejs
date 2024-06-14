import { body } from "../utils/body.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "crypto";
import userModel from "../model/user.js";

const cwd = process.cwd();
const viewPath = path.join(cwd, "view");

const loginForm = fs.readFileSync(path.join(viewPath, "login.html"), {
  encoding: "utf8",
});
const registerForm = fs.readFileSync(path.join(viewPath, "register.html"), {
  encoding: "utf8",
});
const nav = fs.readFileSync(path.join(viewPath, "nav.html"), {
  encoding: "utf8",
});
export async function register(req, res) {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    const error = "All fields are required.";
    const html = body(nav + `<p>${error}</p>` + registerForm);
    return res.status(400).send(html);
  }

  if (password !== confirmPassword) {
    const error = "Passwords do not match.";
    const html = body(nav + `<p>${error}</p>` + registerForm);
    return res.status(400).send(html);
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      const error = "User already exists.";
      const html = body(nav + `<p>${error}</p>` + registerForm);
      return res.status(400).send(html);
    }

    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("hex");

    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save().then(() => {
      res.redirect("/login");
    });
  } catch (err) {
    const error = "An error occurred.";
    const html = body(nav + `<p>${error}</p>` + registerForm);
    res.status(500).send(html);
  }
}
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = "All fields are required.";
    const html = body(nav + `<p>${error}</p>` + loginForm);
    return res.status(400).send(html);
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      const error = "Invalid email or password.";
      const html = body(nav + `<p>${error}</p>` + loginForm);
      return res.status(400).send(html);
    }

    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("hex");

    if (user.password !== hashedPassword) {
      const error = "Invalid email or password.";
      const html = body(nav + `<p>${error}</p>` + loginForm);
      return res.status(400).send(html);
    }

    req.session.user = user;
    res.redirect("/dashboard");
  } catch (err) {
    const error = "An error occurred.";
    const html = body(nav + `<p>${error}</p>` + loginForm);
    res.status(500).send(html);
  }
}

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
