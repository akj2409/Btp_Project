import React, { useEffect, useState } from "react";
import Dashbar from "./Dashbar";
import { FaRupeeSign } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";

function createData(
  rank: number,
  name: string,
  bio: string,
  email: string,
  skilltech: string
) {
  return { rank, name, bio, email, skilltech };
}

const rows = [
  createData(
    1,
    "Frozen yoghurt",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    2,
    "Ice cream sandwich",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    3,
    "Eclair",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    4,
    "Cupcake",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    5,
    "Gingerbread",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    6,
    "Frozen yoghurt",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    7,
    "Ice cream sandwich",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    8,
    "Eclair",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    9,
    "Cupcake",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
  createData(
    10,
    "Gingerbread",
    "Web Designer",
    "rohan@gmail.com",
    "CSS, Js, React, Mongodb"
  ),
];

const fetchjoburl = 'http://localhost:5000/jobs/jobsbyid/'
const fetchuserbyidurl = 'http://localhost:5000/users/user_by_id/'
const fetchdetailsurl = 'http://localhost:5000/saveDetails/getDetailsbyid/'


const applied_users: {name: string,bio: string,email: string,mobile_no:string , _id:string}[] = [] ;

const Jobdetail = () => {

  const [jobdetaildata,setjobdetaildata] = useState({title:'' , id:'' , applied_user:'' , description:'', skills:'' , budget:''});

  const id = localStorage.getItem('id');
  // console.log(id);
let applied_users_id ;
  const fetchjob = async()=>{
    await fetch(fetchjoburl+id , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
      }
    }).then(async(res)=>{
      const data = await res.json();
      setjobdetaildata({title:data.job.title , id:data.job.id ,applied_user:data.job.applied_user , description:data.job.description , skills:data.job.skills ,budget:data.job.budget});
      console.log(data.job);
      applied_users_id = data.job.applied_user ;
      applied_users_id.forEach((id1: string) => {
        if(id1.length) getapplieduser(id1);
      });
      console.log(applied_users);
    }).catch(err=>{
      console.log(err);
    })
  }


  const getapplieduser = async(id:string)=>{
     let name , mobile_no , email , bio ,_id = id;
      await fetch(fetchuserbyidurl+id, {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
      }
      }).then(async(res)=>{
        const data = await res.json();
        name = data.user.first_name ;
        console.log(name);
        email = data.user.email ;
        console.log(email);
      }).catch(err=>{
        console.log(err);
      })

      await fetch(fetchdetailsurl+id,{
        method:'GET',
      headers:{
        "Content-Type":"application/json",
      }
      }).then(async(res)=>{
        const data = await res.json();
        console.log(data);
        mobile_no = data.details[0].mobile_no ;
        bio = data.details[0].bio;
        console.log(mobile_no);
        console.log(bio);
      }).catch(err=>{
        console.log(err);
      })

      // const object = {
      //   "name":name,
      //    "mobile_no": mobile_no , 
      //    "email" :email ,
      //     "bio":bio , "_id":_id
      // }

      // applied_users.push(object);
  }

  

  useEffect(()=>{
    fetchjob();
  },[]);
 
  return (
    <>
      <Dashbar />
      <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
        <h1 className="font-manrope text-black font-extrabold p-4 text-2xl">
          {" "}
          Job Details
        </h1>
        <div className="bg-foreground flex flex-col gap-4 m-auto rounded-lg  p-5 w-full  shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
          <div className="flex flex-col  p-4 justify-start items-start gap-4">
            <div className="flex flex-row w-full justfy-between s:flex-col s:gap-4">
              <div className="flex w-2/5 flex-col">
                <h2 className="font-manrope font-bold text-black text-base">
                  Title
                </h2>
                <p className="font-manrope text-grey text-sm">
                  {jobdetaildata.title}
                </p>
              </div>
              <div className="flex w-2/5 flex-col">
                <h2 className="font-manrope font-bold text-black text-base">
                  Budget
                </h2>
                <p className=" flex items-center font-manrope text-grey text-sm">
                  <FaRupeeSign />
                  {jobdetaildata.budget}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-manrope font-bold text-black text-base">
                Skills
              </h2>
              <p className="font-manrope text-grey text-sm">
                {jobdetaildata.skills}
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="font-manrope font-bold text-black text-base">
                Description
              </h2>
              <p className="font-manrope text-grey text-sm">
              {jobdetaildata.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-24 py-10 w-fll bg-background flex flex-col justify-center m:px-16 s:px-8">
        <h1 className="font-manrope text-black font-extrabold p-4 text-2xl">
          {" "}
          Best Matches
        </h1>
        <div className="bg-foreground flex flex-col gap-4 m-auto rounded-lg  p-5 w-full  shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="font-manrope text-lg font-extrabold">Rank</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-manrope text-lg font-extrabold">User</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-manrope text-lg font-extrabold">
                      Email Address
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-manrope text-lg font-extrabold">
                      Skill Tech
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-manrope text-lg font-extrabold">Chat</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.rank}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <h1 className="font-manrope text-grey">{row.rank}</h1>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-4 items-center ">
                        <div>
                          <Avatar
                            sx={{ backgroundColor: "#4923B4" }}
                            alt={row.name}
                            src="."
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="font-bold font-manrope">{row.name}</h1>
                          <h1 className="font-manrope text-grey">{row.bio}</h1>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-manrope text-grey">{row.email}</h1>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-manrope text-grey">
                        {row.skilltech}
                      </h1>
                    </TableCell>
                    <TableCell>
                      <BsChatLeftTextFill size={"30px"} color="#4923B4" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Jobdetail;
