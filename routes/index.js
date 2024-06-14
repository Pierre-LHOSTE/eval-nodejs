import express from "express";
import userRoutes from "./userRoutes.js";
import navRoutes from "./navRoutes.js";

const router = express.Router();

router.use("/", userRoutes);
router.use("/", navRoutes);

export default router;
