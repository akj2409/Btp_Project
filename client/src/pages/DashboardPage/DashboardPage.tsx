import React,{useEffect, useState} from "react";
import {
  AiFillDropboxCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import Graph from "./components/Graph";
import Jobcard from "./components/Jobcard";
import Dashbar from "./components/Dashbar";
import { useNavigate } from "react-router-dom";
import {Avatar} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Product } from "../../interfaces/Data";

const AllJoburl = 'http://localhost:5000/jobs/jobs_of_client'

const jobcards: {title: string,skillset: string[],amount: string,id:string}[] = [] ;

const DashboardPage = () => {
  const navigate = useNavigate();
    // const [jobcards, loading] = useFetch<Product[]>("/dummy/jobs.json");
  const[job,setjob] = useState("0"); 
  const[jobdata, setjobdata] = useState([]); 
    const fetchDetails = async()=>{
        const token = localStorage.getItem('token');
        await fetch(AllJoburl, {
          method:'GET',
          headers:{
            "Content-Type":"application/json",
            "token":`${token}`
          },
        }).then(async(res)=>{
          const data = await res.json();
          setjob(data.jobs.length)
          setjobdata(data.jobs);
          let arr = data.jobs ;
          jobcards.length = 0;
          arr.forEach((element: { title: any; skills: any; budget: any; _id: any; }) => {
            const object = {
              title: element.title,
              skillset: element.skills,
              amount: element.budget,
              id:element._id
            }
            jobcards.push(object);
          });
        }).catch(err=>{
          console.log(err);
        })
    }

    useEffect(()=>{
      fetchDetails();
    },[]);

  return (
    <>
      <Dashbar />
      <div className=" p-8 bg-background">
        <div className="flex flex-wrap flex-row justify-center items-start gap-8">
          <div className="flex-1 flex max-w-xs max-h-32 justify-center items-start flex-col gap-4 m-4 p-4 rounded-[10px] bg-foreground shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)]">
            <div className="flex flex-row w-full justify-between items-center ">
              <h2 className="text-xl font-medium">Monis Khan</h2>
             
              <Avatar sx={{ width: '50px', height: '50px',backgroundColor: "#E878CF" }} alt={"Monis"} src="." />
            </div>
            <h1 className="text-sm font-semibold text-grey flex items-center mt-2 ">
      
              moniskhandx@gmail.com
            </h1>
          </div>
          <div className="flex-1  max-w-xs max-h-32 flex justify-center items-start flex-col gap-4 m-4 p-4 rounded-[10px] bg-foreground shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)]">
            <div className="flex flex-row w-full justify-between items-center ">
              <h2 className="text-xl font-medium">Jobs</h2>
              <AiFillDropboxCircle size="60px" color="#4923B4" />
            </div>
            <h1 className="text-3xl font-semibold">{job}</h1>
          </div>
          <div className="flex-1 flex h-32 max-w-xs justify-center items-center flex-col  m-4 p-1 rounded-[10px] bg-[#E878CF] shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)]">
            {/* <h2 className='text-xl text-foreground font-medium'>Monthly Earnings</h2> */}
            {/* <Sparkline  id="line-sparkline" currentColor="#fff" type="Line" height="60px" width="200px" data={SparklineData} color="#fff" /> */}
            <Graph />
          </div>
          <div className="flex-1 flex max-w-xs justify-center items-start flex-col gap-4 m-4 p-4 rounded-[10px] bg-foreground shadow-[0px_7px_30px_0px_rgba(90,114,123,0.11)]">
            <div className="flex flex-row w-full justify-between items-center gap-1">
              <h2 className="text-xl font-medium">Post Job</h2>
              <button onClick={() => navigate("/jobform")}>
                {" "}
                <AiFillPlusCircle size="60px" color="#4923B4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className=" p-8 bg-background xm:px-0">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="font-manrope mb-4 text-[44px]/[62px] font-semibold text-black text-center xm:text-[28px]/[40px]">
            Manage Jobs
          </h1>
          <div className="flex flex-wrap justify-center">
            {false ? (
              <div className="h-screen justify-center items-center text-5xl italic text-teal-600">
                Loading
              </div>
            ) : (
              jobcards.map((jobcard, i) => (
                <Jobcard
                  key={i}
                  title={jobcard.title}
                  skillset={jobcard.skillset}
                  amount={jobcard.amount}
                  //   description={jobcard.description}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;