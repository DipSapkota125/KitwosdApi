import express from "express";
import { AddDetails, allDetails, foodSearch } from "../controllers/food.js";
import upload from "../file/file.js";
import { authenticated, authorizeRoles } from "../middlewares/auth.js";
const router = express.Router();

//food routes
router.post(
  "/add/food",
  upload.single("foodImage"),
  authenticated,
  authorizeRoles("admin"),
  AddDetails
);

router.get("/all/food", allDetails);
router.get("/food/search", foodSearch);

export default router;
