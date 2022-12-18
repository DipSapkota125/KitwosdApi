import express from "express";
import {
  login,
  register,
  singleUser,
  updateProfile,
} from "../controllers/user.js";
import upload from "../file/file.js";
import { authenticated } from "../middlewares/auth.js";

const router = express.Router();

//user route
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/me", authenticated, singleUser);
router.put(
  "/update/profile",
  authenticated,
  upload.single("avatar"),
  updateProfile
);

export default router;
