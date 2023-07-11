import React, { useEffect, useState } from "react";
import Dashbar from "./Dashbar";
import { FaRupeeSign } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
  mobile_no: string,
  id:string
) {
  return { rank, name, bio, email, mobile_no ,id};
}


const rows :{rank: number,
  name: string,
  bio: string,
  email: string,
  mobile_no: string,
  id:string}[] = [];
const fetchjoburl = 'http://localhost:5000/jobs/jobsbyid/'
const fetchuserbyidurl = 'http://localhost:5000/users/user_by_id/'
const fetchdetailsurl = 'http://localhost:5000/saveDetails/getDetailsbyid/'


const applied_users: {name: string,bio: string,email: string,mobile_no:string , _id:string}[] = [] ;

const Jobdetail = () => {
  
  const [jobdetaildata,setjobdetaildata] = useState({title:'' , id:'' , applied_user:'' , description:'', skills:'' , budget:''});
  const [userstate , setuserstate] = useState({})

  let size: number ;
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
      // console.log(data.job);
      applied_users_id = data.job.applied_user ;
      applied_users.length=0;
      size = applied_users_id.length ;
       applied_users_id.forEach((id1: string) => {
        console.log("hlo this is check");
        if(id1.length && applied_users.length < size) getapplieduser(id1);
      })
    }).catch(err=>{
      console.log(err);
    })
  }


  const getapplieduser = async(id:string)=>{
     const object: {name: string,bio: string,email: string,mobile_no:string , _id:string} = {
       name: "",
       bio: "",
       email: "",
       mobile_no: "",
       _id: id
     };
      await fetch(fetchuserbyidurl+id, {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
      }
      }).then(async(res)=>{
        const data = await res.json();
        object.name = data.user.first_name ;
        object.email = data.user.email ;
        await fetch(fetchdetailsurl+id,{
          method:'GET',
        headers:{
          "Content-Type":"application/json",
        }
        }).then(async(res)=>{
          const data1 = await res.json();
          if(data1.details.length===1){
            object.mobile_no =  data1.details[0].mobile_no;
            object.bio =  data1.details[0].bio ;
          }

          if(size-1 > rows.length ){
            rows.push(createData(rows.length+1 , object.name ,object.bio ,object.email , object.mobile_no , object._id))
            console.log(rows);

          }
          setuserstate(applied_users);
          // console.log(rows) 
                   
        })
      }).catch(err=>{
        console.log(err);
      })
  }


  useEffect(()=>{
    fetchjob();
  },[]);

  console.log(rows);

  const navigate = useNavigate();

  const func=(id:any)=>{
    localStorage.setItem('user_id',id);
    navigate(`/userdetail`)
  }
 
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

        {rows.length ?<div className="bg-foreground flex flex-col gap-4 m-auto rounded-lg  p-5 w-full  shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="font-manrope text-lg font-extrabold">S.no</p>
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
                      Mobile
                    </p>
                  </TableCell>
                  {/* <TableCell>
                    <p className="font-manrope text-lg font-extrabold">Chat</p>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((user,i) => (
                  <TableRow 
                    onClick={()=>func(user.id)}
                    key={i}
                  >
                    <TableCell>
                      <h1 className="font-manrope text-grey">{user.rank}</h1>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-4 items-center ">
                        <div>
                          <Avatar
                            sx={{ backgroundColor: "#4923B4" }}
                            alt={user.name}
                            src="."
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="font-bold font-manrope">{user.name}</h1>
                          <h1 className="font-manrope text-grey">{user.bio}</h1>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-manrope text-grey">{user.email}</h1>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-manrope text-grey">
                        {user.mobile_no}
                      </h1>
                    </TableCell>
                    {/* <TableCell>
                      <BsChatLeftTextFill size={"30px"} color="#4923B4" />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div> : <h1>No One Applied Yet</h1>}
      </div>
    </>
  );
};

export default Jobdetail;
