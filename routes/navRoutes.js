import express from "express";
import {
  getDashboard,
  getLoginForm,
  getRegisterForm,
} from "../controller/nav.controller.js";

const router = express.Router();

router.get("/", getRegisterForm);
router.get("/login", getLoginForm);
router.get("/dashboard", getDashboard);

export default router;
