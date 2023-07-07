import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Jobdetail from "./Jobdetail";
const Jobcard = ({ title, skillset, amount, description }: any) => {
  const navigate = useNavigate();

  const [deleteResponse, deleteLoading, deleteFunc] = useFetch("/asas", {
    method: "DELETE",
    manual: true,
  });

  return (
    <div
      onClick={() => navigate(`/jobdetail/${title}`)}
      // onClick={handleClick}
      className=" flex w-1/2 justify-start relative z-0 flex-row gap-4 m-4 p-4 rounded-[10px] bg-foreground hover:shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)] l:flex-col l:w-2/5 xm:w-4/5 "
    >
      <div className="flex flex-col justify-center items-start gap-2">
        <h1 className="font-manrope text-blact font-semibold">{title}</h1>
        <div className="flex flex-row justify-center items-start gap-4">
          <p className="font-manrope text-grey text-xs">{skillset}</p>
          <p className="font-manrope text-grey text-xs">{amount}</p>
        </div>
      </div>
      <div className="flex justify-start items-center ml-[50%] l:ml-0">
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
