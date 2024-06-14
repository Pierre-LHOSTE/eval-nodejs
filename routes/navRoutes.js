import express from "express";
import {
  getDashboard,
  getLoginForm,
  getRegisterForm,
  getMainPage,
} from "../controller/nav.controller.js";

const router = express.Router();

router.get("/", getMainPage);
router.get("/login", getLoginForm);
router.get("/dashboard", getDashboard);

export default router;
