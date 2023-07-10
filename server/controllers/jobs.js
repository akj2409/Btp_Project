import {Jobs} from '../models/Jobs.js';

export const createJob = async(req,res)=>{
    try {
        const {_id} = req.user_name ;
        const {title , description, budget ,skills} = req.body ;
        const data = await Jobs.create({title , description ,client_id:_id ,budget , skills , applied_user:{}});

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
            return res.status(200).json({sucess:true , message:"Alreay Rregistered For This Job"})
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

export const job_by_id = async(req,res)=>{
    try {
        const id = req.params['id'] ;
        const job = await Jobs.findOne({_id:id});
        if(!job) return res.status(404).json({sucess:false , message:"Job Not Found"});
        console.log(job);
        res.status(200).json({sucess:true , message:"Job Found", job});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error:error});
        console.log(error);
    }
}


export const alljobs = async(req,res)=>{
    try {
        const jobs = await Jobs.find();
        console.log(jobs);
        res.status(200).json({sucess:true , message:"All Jobs Found" , jobs});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error:error});
        console.log(error);
    }
}

export const deletejob = async(req,res)=>{
    try {
        const id = req.params['id'];

        await Jobs.deleteOne({_id:id});
        res.status(200).json({sucess:true ,message:"Job Deleted "});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error:error});
        console.log(error);
    }
}