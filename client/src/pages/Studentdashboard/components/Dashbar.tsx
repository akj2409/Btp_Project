import React from 'react'
import {HiOutlineLogout} from 'react-icons/hi';
import {IoMdContact} from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const Dashbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center sticky w-full px-[4rem] py-[.5rem] bg-foreground shadow-lg vs:px-2 ">
        <h3 className="font-manrope text-black font-extrabold text-xl s:text-xl">Aviate-freelance</h3>
        <div className='flex items-center gap-2'>
          <IoMdContact onClick={()=>navigate("/profile")}size={35} color='#4923B4'/>  
          <button onClick={()=>{}} className=" flex items-center gap-1 btn-1 s:m-[.4rem]" type="button" ><HiOutlineLogout size={20}/>Sign Out </button>
        </div>
    </div>
  )
}

export default Dashbar