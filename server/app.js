import express from "express";
import { connectDb } from "./db/database.js";
import userRouter from "./Routes/user.js";
import jobRouter from "./Routes/jobs.js";
import projectRouter from "./routes/projects.js";

connectDb();
const app = express();
app.use(express.json());

const PORT = 5000;

app.use("/users", userRouter);
app.use("/jobs", jobRouter);
app.use("/project", projectRouter);

app.use("/", (req, res) => {
  res.send("Nice Working");
});
app.listen(PORT, () => {
  console.log(`server Is running on ${PORT}`);
});

// login Api
// http://localhost:5000/users/login

// register Api
// http://localhost:5000/users/newuser

// userDetail Api
// http://localhost:5000/users/details

// userDetail by id
// http://localhost:5000/users/details_by_id

// All Applied jobs of user
// http://localhost:5000/users/applied_jobs

// jobs Api

// create job
// http://localhost:5000/jobs/create_job

// apply job
// http://localhost:5000/jobs/apply

// All jobs of client
// http://localhost:5000/jobs/jobs_of_client

//project Api

//Post Project
//http://localhost:5000/projects/post_project
//http://localhost:5000/jobs/all_projects
