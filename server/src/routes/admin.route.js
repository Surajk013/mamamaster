import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { addCourse } from "../controllers/admin.controller.js";

const router = Router();

router.route("/course/add").post(verifyJWT, verifyAdmin, addCourse); //yet to be added

export default router;
