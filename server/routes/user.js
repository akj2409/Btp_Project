import express from 'express' ;
import {Register , Login,getDetail , getDetail_by_userid , get_user_applied_job} from '../controllers/register.js'
import {fetchuser} from '../middleware/fetchuser.js'; 
import { body } from 'express-validator';
const router = express.Router();

router.post('/newuser' ,[
    body('first_name' , 'First name should be atleast 3 character').isLength({ min: 3 }),
    body('last_name' , 'Last name should be atleast 3 character').isLength({ min: 3 }),
    body('email' , 'Enter A valid email').isEmail(),
    body('password' , 'Password must be atleast 5 Charecters').isLength({ min: 5 })
], Register);

router.post('/login' ,[
    body('email' , 'Enter A valid email').isEmail(),
    body('password' , 'Password must be atleast 5 Charecters').isLength({ min: 5 })
], Login)

router.get('/details', fetchuser , getDetail);
router.get('/details_by_id/:id' , getDetail_by_userid);
router.get('/applied_jobs' ,fetchuser , get_user_applied_job );

export default router ;