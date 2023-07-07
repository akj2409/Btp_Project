import express from 'express' ;
import {Register , Login,getDetail , getDetail_by_userid , get_user_applied_job} from '../controllers/register.js'
import {fetchuser} from '../middleware/fetchuser.js'; 
const router = express.Router();

router.post('/newuser' , Register);
router.get('/login' , Login)

router.get('/details', fetchuser , getDetail);
router.post('/details_by_id' , getDetail_by_userid);
router.get('/applied_jobs' ,fetchuser , get_user_applied_job );

export default router ;