import React from 'react'
import { AiFillDelete } from "react-icons/ai";

const Projectcard = ({id,title,skillset,link}:any) => {
  
  return (
    <div className=" flex w-full justify-between relative z-0 flex-row gap-4 m-4 p-4 rounded-[10px] bg-foreground hover:shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)] l:flex-col l:w-2/5 xm:w-4/5 ">
    <div className="flex flex-col justify-center items-start gap-2">
      <h1 className="font-manrope text-black font-semibold">{title}</h1>
      <p className=" flex items-center font-manrope text-grey text-xs"><a href="">{link}</a></p>
      <div className="flex flex-row justify-center items-start gap-2">
        {skillset.map((skill: any,i: any)=>(
          <div key={i} className="bg-[#cec1f3] flex justify-center items-center rounded-xl px-2.5 py-1">
           <p className="font-manrope text-black text-xs">{skill}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Projectcard