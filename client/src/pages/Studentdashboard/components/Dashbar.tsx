import React,{useEffect, useState} from 'react'
import {HiOutlineLogout} from 'react-icons/hi';
import {IoMdContact} from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const Dashbar = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [toggle,settoggle] = useState(true);
  const func =()=>{
    navigate("/profile");
  }

  const logout = ()=>{
    window.history.pushState(null,'','/');
    localStorage.clear();
    navigate('/');
  }
  let x=window.location.href;
  x=x.slice(-7);
  useEffect(()=>{
    if(x=="profile"){
      settoggle(false);
    }else if(x=="ectform"){
      settoggle(false);
    }else{
      settoggle(true);
    }
  },[location]);
  const [show,setShow]=useState(0)

  return (
    <div className="flex justify-between items-center sticky w-full px-[4rem] py-[.5rem] bg-foreground shadow-lg vs:px-2 ">
        <h3 className="font-manrope text-black font-extrabold text-xl s:text-xl">Aviate-freelance</h3>
        <div className='flex items-center gap-2'>
          {toggle && (<IoMdContact onClick={func} size={35} color='#4923B4'/>  )}
          <button onClick={logout} className=" flex items-center gap-1 btn-1 s:m-[.4rem]" type="button" ><HiOutlineLogout size={20}/>Sign Out </button>
        </div>
    </div>
  )
}

export default Dashbar