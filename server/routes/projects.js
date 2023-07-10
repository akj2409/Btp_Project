import express from "express";
import {
  PostProject,
  all_projects_of_freelancer,
} from "../controllers/Projects.js";
import { fetchuser } from "../middleware/fetchuser.js";
const router = express.Router();

router.post("/post_project", fetchuser, PostProject);
router.get("/all_projects", fetchuser, all_projects_of_freelancer);

export default router;