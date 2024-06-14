import { body } from "../utils/body.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "crypto";
import userModel from "../model/user.js";

const cwd = process.cwd();
const viewPath = path.join(cwd, "view");

export async function register(req, res) {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    req.session.message = { text: "All fields are required.", type: "error" };
    return res.status(400).redirect("/");
  }

  if (password !== confirmPassword) {
    req.session.message = { text: "Passwords do not match.", type: "error" };
    return res.status(400).redirect("/");
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      req.session.message = { text: "Email already exists.", type: "error" };
      return res.status(400).redirect("/");
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
      req.session.message = {
        text: "Registration successful.",
        type: "success",
      };
      res.redirect("/login");
    });
  } catch (err) {
    req.session.message = { text: "An error occurred.", type: "error" };
    res.status(500).redirect("/");
  }
}
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    req.session.message = { text: "All fields are required.", type: "error" };
    return res.status(400).redirect("/login");
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      req.session.message = { text: "User not found.", type: "error" };
      return res.status(400).redirect("/login");
    }

    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("hex");

    if (user.password !== hashedPassword) {
      req.session.message = {
        text: "Invalid email or password.",
        type: "error",
      };
      return res.status(400).redirect("/login");
    }

    req.session.user = user;
    req.session.message = { text: "Login successful.", type: "success" };
    res.redirect("/dashboard");
  } catch (err) {
    req.session.message = { text: "An error occurred.", type: "error" };
    res.status(500).redirect("/login");
  }
}

export const logout = (req, res) => {
  req.session.regenerate((err) => {
    if (err) {
      console.log(err);
      req.session.message = { text: "Logout unsuccessful.", type: "error" };
    } else {
      req.session.message = { text: "Logout successful.", type: "success" };
    }
    res.redirect("/");
  });
};
