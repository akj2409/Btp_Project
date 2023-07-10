import express from 'express' ;
import {connectDb} from './db/database.js'
import userRouter from './routes/user.js'
import jobRouter from './routes/jobs.js'
import projectRouter from "./routes/projects.js";
import detailsRouter from "./routes/details.js"
import cors from 'cors';

 connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
    origin:'http://localhost:5173'
}));

const PORT = 5000;



app.use('/users',userRouter);
app.use('/jobs',jobRouter);
app.use("/project", projectRouter);

app.use('/saveDetails' , detailsRouter);


app.use('/' , (req,res)=>{
    res.send("Nice Working");
})
app.listen(PORT , ()=>{
    console.log(`server Is running on ${PORT}`);
})




// login Api
// http://localhost:5000/users/login

// register Api
// http://localhost:5000/users/newuser

// userDetail Api
// http://localhost:5000/users/details


// userDetail by id
// http://localhost:5000/users/user_by_id/:id

// All Applied jobs of user 
// http://localhost:5000/users/applied_jobs



// jobs Api

// create job
// http://localhost:5000/jobs/create_job

// apply job
// http://localhost:5000/jobs/apply

// All jobs of client 
// http://localhost:5000/jobs/jobs_of_client

// job by id
// http://localhost:5000/jobs/jobsbyid/:id


// all jobs 
// http://localhost:5000/jobs/alljobs

// deletejob
// http://localhost:5000/jobs/deletejob/:id





//project Api

//Post Project
// http://localhost:5000/project/post_project

// get All Projects
//http://localhost:5000/project/all_projects


// Details Save
// http://localhost:5000/saveDetails/save

// getDetails
// http://localhost:5000/saveDetails/getDetails

// get details by id
// http://localhost:5000/saveDetails/getDetailsbyid/:id
