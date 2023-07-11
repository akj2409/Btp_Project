import React,{useState} from 'react'
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io';
import { FaRupeeSign } from "react-icons/fa";
const applyurl = 'http://localhost:5000/jobs/apply';
const revokejoburl = 'http://localhost:5000/jobs/revoke/'

const Jobcard = ({id,title,skillset,amount,description , property , func}:any) => {
    const token = localStorage.getItem('token');
    const applyforjob= async()=>{
      const object = {
        "job_id":id
      }
      await fetch(applyurl ,{
        method:'POST',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      },
      body:JSON.stringify(object)
      }).then(async(res)=>{
        const data = await res.json();
        alert(data.message);
        if(data.sucess){
          func();
        }
      }).catch(err=>{
        console.log(err);
      })
    }

    const revokejob = async()=>{
      await fetch(revokejoburl+id ,{
        method:'GET',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      }
      }).then(async(res)=>{
        const data = await res.json();
        alert(data.message);
        if(data.sucess){
          func(true);
        }
      }).catch(err=>{
        console.log(err);
      })
    }
    const [toggledetail,settoggledetail] = useState(false);
  return (
    <div  className=' flex w-1/2 justify-start gap-4 flex-col m-4 p-4 rounded-[10px] border border-gray bg-foreground  hover:shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)]  l:w-4/5 xm:w-4/5 '>
    <div className='flex flex-row justify-between gap-4 xm:flex-col '>
    <div className='flex flex-col justify-center items-start gap-2'>
        <h1 className='font-manrope text-black font-bold'>{title}</h1>
        <p className=" flex items-center font-manrope text-grey text-xs">Budget:<FaRupeeSign size={10}/>{amount}</p>
        <div className="flex flex-row flex-wrap justify-start items-start gap-2">
          {skillset.map((skill: any,i: any)=>(
            <div key={i} className="bg-[#cec1f3] flex justify-center items-center rounded-xl px-2.5 py-1">
             <p className="font-manrope text-black text-xs">{skill}</p>
            </div>
          ))}
        </div>
    </div>
    <div className='flex justify-start gap-2 items-center'>
      {property ?<button  className="text-indigo-500  p-2 font-medium rounded text-sm  cursor-pointer bg-foreground font-manrope outline-none border-none" onClick={applyforjob}>Apply</button> :
      <button  className="text-indigo-500  p-2 font-medium rounded text-sm  cursor-pointer bg-foreground font-manrope outline-none border-none" onClick={revokejob}>Revoke</button>
      }
    
        {toggledetail ? (
            <IoIosArrowUp className='hover:cursor-pointer' onClick={()=>settoggledetail(false)} size="20px" color="#4923B4"/>
        ):(
            <IoIosArrowDown className='hover:cursor-pointer' onClick={()=>settoggledetail(true)} size="20px" color="#4923B4"/>
        )}
      
    </div>
    </div>    
    {toggledetail && (
      <div>
         <div className=' flex flex-col justify-center gap-1 items-start'>
            <h1 className='font-manrope font-bold text-black text-base'>Description</h1>
            <p className='font-manrope text-grey text-sm'>{description}</p>
         </div>
      </div>   

    )}  
 </div>
  )
}

export default Jobcard