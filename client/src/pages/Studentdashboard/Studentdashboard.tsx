import React, { useEffect,useState } from "react";
import Jobcard from "./components/Jobcard";
import Dashbar from "./components/Dashbar";
import { elementAnimate } from "@syncfusion/ej2/maps";

const alljobsUrl = 'http://localhost:5000/jobs/alljobs';

const jobcards: {title: string,skillset: string[],amount: string,id:string,description: string}[] = [] ;

const Studentdashboard = () => {
  const [jobdata,setjobdata] = useState([])
  const fetchjobs = async()=>{
    await fetch(alljobsUrl , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
      }
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);
      setjobdata(data.jobs);
      let arr = data.jobs ;
          jobcards.length = 0;
          arr.forEach((element: { title: any; skills: any; budget: any; _id: any; description: any }) => {
            const object = {
              title: element.title,
              skillset: element.skills,
              amount: element.budget,
              id:element._id,
              description:element.description
            }
            jobcards.push(object);
          });
    }).catch(err=>{
      console.log(err);
    })
  }
 
  useEffect(()=>{
    fetchjobs();
  },[]);
  
 
  return (
    <>
      <Dashbar />
      <div className="h-screen bg-background">
      <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
        <h1 className="font-manrope text-black text-center font-extrabold p-4 text-3xl vs:text-xl">
          Best Matches Jobs For You
        </h1>
        <div className="flex flex-col items-center  justify-center">
          { jobcards.map((jobcard, i) => 
            <Jobcard
            key={i}
            id={jobcard.id}
            title={jobcard.title}
            skillset={jobcard.skillset}
            amount={jobcard.amount}
            description={jobcard.description}
          />
        )}
          
        </div>
      </div>
      </div>
    </>
  );
};

export default Studentdashboard;
