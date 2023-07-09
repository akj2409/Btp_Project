import express from "express";
import {
  PostProject,
  all_projects_of_freelancer,
} from "../controllers/Projects";
import { fetchuser } from "../middleware/fetchuser.js";
const Router = express.Router();

router.post("/post_project", PostProject, fetchuser);
router.get("/all_projects", fetchuser, all_projects_of_freelancer);

export default router;
