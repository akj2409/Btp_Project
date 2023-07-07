import {Jobs} from '../models/Jobs.js';

export const createJob = async(req,res)=>{
    try {
        const {_id} = req.user_name ;
        const {title , description} = req.body ;
        const data = await Jobs.create({title , description ,client_id:_id , applied_user:{}});

        res.status(200).json({sucess:true , message:"Jobs Posted"});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error});
    }
}


export const Apply_job = async(req,res)=>{
    try {
        const {_id} = req.user_name ;
        const {job_id} = req.body ;

        const job = await Jobs.findById({_id:job_id});
        // console.log(job);
        const applied = job.applied_user ;

        if(applied.includes(_id)){
            return res.status(200).json({sucess:true , message:"Alreay Rregistered"})
        }
        
         await Jobs.updateOne({_id:job_id}, {$push: {applied_user:_id}});
        
        res.status(200).json({sucess:true , message:"Applied Successfully"});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error:error});
        console.log(error);
    }
}


export const All_jobs_of_client = async(req,res) =>{
    try {
        const {_id} = req.user_name ;
        const jobs = await Jobs.find({client_id:_id});
        return res.status(200).json({sucess:true , message:"Jobs Of Client " , jobs});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error:error});
        console.log(error);
    }
}
