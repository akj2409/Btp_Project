import React from 'react'
import {HiOutlineLogout} from 'react-icons/hi';

const Dashbar = () => {
  return (
    <div className="flex justify-between items-center sticky w-full px-[4rem] py-[.5rem] bg-foreground shadow-lg vs:px-2">
        <h3 className="font-manrope text-black font-extrabold text-xl s:text-xl">Aviate-freelance</h3>
        <button onClick={()=>{}} className=" flex items-center gap-1 btn-1 s:m-[.4rem]" type="button" ><HiOutlineLogout size={20}/>Sign Out </button>
    </div>
  )
}

export default Dashbar