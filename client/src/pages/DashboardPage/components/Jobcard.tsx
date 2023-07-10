import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { FaRupeeSign } from "react-icons/fa";
const Jobcard = ({ title, skillset, amount, description }: any) => {
  const navigate = useNavigate();

  const [deleteResponse, deleteLoading, deleteFunc] = useFetch("/asas", {
    method: "DELETE",
    manual: true,
  });

  return (
    <div className=" flex w-1/2 justify-between relative z-0 flex-row gap-4 m-4 p-4 rounded-[10px] bg-foreground hover:shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)] l:flex-col l:w-2/5 xm:w-4/5 ">
      <div className="flex flex-col justify-center items-start gap-2">
        <h1 className="font-manrope text-black font-semibold">{title}</h1>
        <p className=" flex items-center font-manrope text-grey text-xs">Budget:<FaRupeeSign size={10}/>{amount}</p>
        <div className="flex flex-row justify-center items-start gap-2">
          {skillset.map((skill: any,i: any)=>(
            <div key={i} className="bg-[#cec1f3] flex justify-center items-center rounded-xl px-2.5 py-1">
             <p className="font-manrope text-black text-xs">{skill}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-start gap-2 items-center ">
        <button onClick={() => navigate(`/jobdetail`)} className="text-indigo-500  p-2 font-medium rounded text-sm  cursor-pointer bg-foreground font-manrope outline-none border-none">View Detail</button>
        <button
          onClick={deleteFunc}
          disabled={deleteLoading}
          className="disabled:opacity-50 relative z-10"
        >
          <AiFillDelete size="20px" color="#4923B4" />
        </button>
      </div>
    </div>
  );
};

export default Jobcard;
