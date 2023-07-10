import express from 'express' ;
import { save_Details } from '../controllers/details.js';
import {fetchuser} from '../middleware/fetchuser.js'; 

const router = express.Router();

router.post('/save' , fetchuser ,save_Details);


export default router ;