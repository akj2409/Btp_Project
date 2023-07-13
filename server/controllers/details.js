import { link } from "fs";
import { UserDetail } from "../models/UserDetails.js";

export const save_Details = async(req,res)=>{
    try {
        const {_id} = req.user_name ;
        const { mobile , address , github , linkedin , bio} = req.body ;

        const details = await UserDetail.findOne({user_id:_id});
        if(details){
            const object = {
                "mobile_no":mobile,
                address,
                "githubLink":github,
                "linkedinLink":linkedin,
                bio
            }
           await details.updateOne(object)

           return res.status(200).json({sucess:true,message:"Details Updated"});
        }
        await UserDetail.create({
            mobile_no:mobile,
            address,
            githubLink:github,
            linkedinLink:linkedin,
            bio,
            user_id:_id
        })

        res.status(200).json({sucess:true, message:"Details Saved Successfully"});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error});
        console.log(error);
    }
}


export const getDetails = async(req,res)=>{
    try {
        const {_id} = req.user_name ;
        const details = await UserDetail.find({user_id:_id});
        return res.status(200).json({sucess:true,message:"Details Found" , details});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error});
        console.log(error);
    }
}

export const getDetailsbyid = async(req,res)=>{
    try {
        const id = req.params['id'] ;
        const details = await UserDetail.find({user_id:id});
        return res.status(200).json({sucess:true,message:"Details Found" , details});
    } catch (error) {
        res.status(500).json({sucess:false , message:"Server Error" , error});
        console.log(error);
    }
}