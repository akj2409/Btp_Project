import express from 'express' ;
import {createJob , Apply_job , All_jobs_of_client} from '../controllers/jobs.js'
import {fetchuser} from '../middleware/fetchuser.js'; 

const router = express.Router();

router.post('/create_job' , fetchuser ,createJob);
router.post('/apply' ,fetchuser, Apply_job)
router.get('/jobs_of_client' ,fetchuser, All_jobs_of_client);

export default router ;