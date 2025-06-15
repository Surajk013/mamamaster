import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { addCourse, getCourse } from "../controllers/admin.controller.js";

const router = Router();

router.route("/course/add").post(verifyJWT, verifyAdmin, addCourse); //yet to be added
router.route("/courses/").get(verifyJWT, verifyAdmin, getCourse);
export default router;
