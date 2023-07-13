import React, { useEffect,useState } from "react";
import Jobcard from "./components/Jobcard";
import { useNavigate } from "react-router-dom";
import Dashbar from "./components/Dashbar";
import {MenuItem,Select,InputLabel, FormControl} from "@mui/material";
import { Theme, useTheme } from "@mui/material";

const alljobsUrl = 'http://localhost:5000/jobs/alljobs';
const applied_jobs_url = 'http://localhost:5000/jobs/applied_job';
const categorywiseurl = 'http://localhost:5000/jobs/filterbycategory'


const categorys = [
  "All Jobs",
  "Web App",
  "Android App",
  "Machine Learning",
  "Artificial Intelligence",
  "System Design",
  "Video Graphics",
  "Editing"
]

const ITEM_HEIGHT = 33;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles( theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

const jobcards: {title: string,skillset: string[],category: string,amount: string,id:string,description: string}[] = [] ;
const appliedjobcards: {title: string,skillset: string[],category: string,amount: string,id:string,description: string}[]=[];
const Studentdashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [category, setcategory] = useState("");
  const handlecategory = (e: any) => {
    setcategory(e.target.value);
  }

  const token = localStorage.getItem('token');
  if(!token){
    navigate('/');
  }
  
  const [jobdata,setjobdata] = useState([]);
  const [appliedjobdata,setappliedjobdata] = useState([]);
  const [reload , setreload]=useState(true);

  const fetchjobs = async()=>{
    await fetch(alljobsUrl , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
      }
    }).then(async(res)=>{
      const data = await res.json();
      // console.log(data);
      setjobdata(data.jobs);
      let arr = data.jobs ;
          jobcards.length = 0;
          arr.forEach((element: { title: any; skills: any; category: any; budget: any; _id: any; description: any }) => {
            const object = {
              title: element.title,
              skillset: element.skills,
              amount: element.budget,
              id:element._id,
              description:element.description,
              category: element.category
            }
            jobcards.push(object);
          });
    }).catch(err=>{
      console.log(err);
    })
  }

  const fetchapplied_jobs = async()=>{
    await fetch(applied_jobs_url , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      }
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);
      setappliedjobdata(data.jobs);
      let arr = data.jobs ;
      appliedjobcards.length = 0;
      arr.forEach((element: { title: any; skills: any; category: any,budget: any; _id: any; description: any }) => {
        const object = {
          title: element.title,
          skillset: element.skills,
          amount: element.budget,
          id:element._id,
          description:element.description,
          category: element.category
        }
        appliedjobcards.push(object);
      });
    }).catch(err=>{
      console.log(err);
    })
  }


const func = (val:boolean)=>{
  setreload(val);
}
const fetchcategorybyjob = async(category: string)=>{
  const object = {
    "category":category
  }
  await fetch(categorywiseurl , {
    method:'POST',
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(object)
  }).then(async(res)=>{
    const data = await res.json();
    // console.log(data);
    setjobdata(data.jobs);
    let arr = data.jobs ;
        jobcards.length = 0;
        arr.forEach((element: { title: any; skills: any; category: any; budget: any; _id: any; description: any }) => {
          const object = {
            title: element.title,
            skillset: element.skills,
            amount: element.budget,
            id:element._id,
            description:element.description,
            category: element.category
          }
          jobcards.push(object);
        });
  }).catch(err=>{
    console.log(err);
  })
}
useEffect(()=>{
  console.log(category);
  if(category==='All Jobs'){
    fetchjobs()
  }else{
   fetchcategorybyjob(category);
  }
},[category]);

 
  useEffect(()=>{
    fetchjobs();
    fetchapplied_jobs();
    setreload(false)
  },[reload]);
  
  return (
    <>
      <Dashbar />
      <div className="h-screen bg-background">
      <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
        <h1 className="font-manrope text-black text-center font-extrabold p-4 text-3xl vs:text-xl">
          Applied Jobs 
        </h1>
        <div className="flex flex-col items-center  justify-center">
          { appliedjobcards.length? appliedjobcards.map((jobcard, i) => 
            <Jobcard
            key={i}
            id={jobcard.id}
            title={jobcard.title}
            skillset={jobcard.skillset}
            amount={jobcard.amount}
            description={jobcard.description}
            category={jobcard.category}
            property={false}
            func={func}
          /> 
        ) : <h1>No Jobs Applied Yet</h1>}
          
        </div>
      </div>
      <hr></hr> 
      <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
        <div className="flex flex-row justify-center gap-16 items-center l:flex-col l:gap-2 ">
        <h1 className="font-manrope text-black text-center font-extrabold p-4  text-3xl vs:text-xl">
          Best Matches Jobs For You
        </h1>
        <FormControl sx={{minWidth: 160}} size="small">
          <InputLabel id="category-label">Select Category</InputLabel>
            <Select
                labelId="category-label"
                id="category"
                required
                fullWidth
                label="Select Category"
                value={category}
                onChange={handlecategory}
                  // input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
                >
                {categorys.map((category,i) => (
                  <MenuItem
                    key={i}
                    value={category}
                    style={getStyles(theme)}
                    >
                    {category}
                  </MenuItem>
                  ))}
            </Select>
        </FormControl>
        </div>
        <div className="flex  flex-col items-center  justify-center">
          { jobcards.map((jobcard, i) => 
            <Jobcard
            key={i}
            id={jobcard.id}
            title={jobcard.title}
            skillset={jobcard.skillset}
            amount={jobcard.amount}
            description={jobcard.description}
            category={jobcard.category}
            property={true}
            func={func}
          />
        )}
          
        </div>
      </div>
      </div>
    </>
  );
};

export default Studentdashboard;
