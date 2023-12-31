import React, { useEffect, useRef, useState } from "react";
import {BsGithub, BsLinkedin } from "react-icons/bs";
import Dashbar from "./Dashbar";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Projectcard from "./Projectcard";
// import fs from 'fs'
import { Base } from "@syncfusion/ej2-base";

const fetchurl = 'http://localhost:5000/users/details';
const saveurl = 'http://localhost:5000/saveDetails/save';
const fetchDetailsurl = 'http://localhost:5000/saveDetails/getDetails';
const fetchprojectsurl = 'http://localhost:5000/project/all_projects';
const deleteprojectbyidurl = 'http://localhost:5000/project/deleteproject/'

const projectcards = [
  {
    title: "UI Designer",
    skillset: ["CSS", "Javascript", "React"],
    link: "https://qwertt",
  },
  {
    title: "UI Designer",
    skillset: ["CSS", "Javascript", "React"],
    link: "https://qwertt",
  },
  {
    
    title: "UI Designer",
    skillset: ["CSS", "Javascript", "React"],
    link: "https://qwertt",
  },
  {
    title: "UI Designer",
    skillset: ["CSS", "Javascript", "React"],
    link: "https://qwertt",
  },
];

const projectards: {title: string,skillset: string[],link: string,id:string}[] = [] ;

const Profile = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  const [image, setimage] = useState("");
  
  const navigate = useNavigate();
  const handleimageclick = () => {
    inputRef.current.click();
  };

  const handleimagechange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    setimage(file);
    console.log(image);
    console.log(typeof(image));
  };

  const [name,setname] = useState("aditya");
  const [email,setemail] = useState("aditya@jhfguoid");
  const [mobile,setmobile] = useState("");
  const [address,setaddress] = useState("");
  const [bio,setbio] = useState("");
  const [gitlink,setgitlink] = useState("");
  const [linkedinlink,setlinkedinlink] = useState("");
  const [projectdata,setprojectdata] = useState([]);
  const handlemobile =(e:any)=>{
    setmobile(e.target.value);
  }

  const handleaddress =(e:any)=>{
    setaddress(e.target.value);
  }

  const handlebio =(e:any)=>{
    setbio(e.target.value);
  }

  const handlegitlink =(e:any)=>{
    setgitlink(e.target.value);
  }

  const handlelinkedinlink =(e:any)=>{
    setlinkedinlink(e.target.value);
  }

  const handlesubmit =async (e:any)=>{
    e.preventDefault();
    console.log({name : name, email: email, mobile: mobile, address: address, bio: bio, gitlink: gitlink, linkedinlink: linkedinlink })
    if(mobile.length <9){
      alert("Enter Correct Mobile Number ...");
      return ;
    }
    const object = {
      "mobile":mobile,
      "address":address,
      "github":gitlink,
      "linkedin":linkedinlink,
      "bio":bio
    }
    const token = localStorage.getItem('token');
    await fetch(saveurl , {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      },
      body:JSON.stringify(object)
    }).then(async(res)=>{
      const data = await res.json();
      alert(data.message);
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })

  }

  const fetchuser = async()=>{
    const token = localStorage.getItem('token');
    await fetch(fetchurl , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      }
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);
      setname(data.user.first_name+" " + data.user.last_name);
      setemail(data.user.email);
    }).catch(err=>{
      console.log(err);
    })
  }

  const fetchDetails = async()=>{
    const token = localStorage.getItem('token');
    await fetch(fetchDetailsurl , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      }
    }).then(async(res)=>{
      const data = await res.json();
      setmobile(data.details[0].mobile_no);
      setaddress(data.details[0].address);
      setbio(data.details[0].bio);
      setgitlink(data.details[0].githubLink);
      setlinkedinlink(data.details[0].linkedinLink);
    }).catch(err=>{
      console.log(err);
    })
  }

  const fetchProjects = async()=>{
    const token = localStorage.getItem('token');

    await fetch(fetchprojectsurl , {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "token":`${token}`
      }
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);
      setprojectdata(data.projects);
      let arr = data.projects ;
          projectards.length = 0;
          arr.forEach((element: { title: any; Skills: any; githubProject: any; _id: any; }) => {
            const object = {
              title: element.title,
              skillset: element.Skills,
              link: element.githubProject,
              id:element._id
            }
            projectards.push(object);
          });
      
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    fetchuser()
    fetchDetails()
    fetchProjects();
  },[]);


  const deleteFunc = async(id: string)=>{
    await fetch(deleteprojectbyidurl+id , {
      method:'DELETE',
      headers:{
        "Content-Type":"application/json"
      }
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);
      alert(data.message);
    }).catch(err=>{
      console.log(err);
      alert(err.message);
    })
    fetchProjects();
  }
  
 
   

  return (
    <>
      <Dashbar/>
      <div className=" section_padding bg-background flex justify-center">
        <div className="flex flex-row justify-center items-start w-full ml:flex-col ml:justify-center ml:items-center">
          <div className="flex-1 flex flex-col justify-center items-center w-full p-4 my-4 mr-4 ml-16 ml:m-4">
            <div className="flex flex-col justify-center items-center p-5 w-full bg-foreground rounded-xl shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
              <div className="flex flex-col justify-center items-center">
                <div
                  className="flex justify-center items-center h-[108px] w-[108px]"
                  onClick={handleimageclick}
                >
                  {image ? (
                    <img
                      className="w-full h-full rounded-full"
                      src={URL.createObjectURL(image as any)}
                      alt="logo"
                    />
                  ) : (
                    <img
                      className="w-full h-full rounded-full"
                      src={"/images/profile.png"}
                      alt="logo"
                    />
                  )}
                </div>
                <h3 className="font-manrope text-xl my-2.5 mx-0 font-bold">
                  {name}
                </h3>
                <input
                    className="w-full p-[.3rem] text-base text-center  outline-none bg-background rounded-md  "
                    type="text" placeholder="Enter Bio" onChange={handlebio} value={bio}
                  />
                <p className="text-sm text-black">{address}</p>
              </div>
              <div className="flex flex-col justify-center items-center mx-4 mb-4 mt-12 py-0 px-5 w-full">
                <div className="flex flex-row justify-between items-center my-2 mx-0 w-full vs:flex-col vs:gap-2">
                  <div className="flex flex-row justify-center items-center">
    
                    <BsGithub />
                    <h5 className="ml-1 font-semibold">Github</h5>
                  </div>
                  <input
                    className="p-[.3rem] text-base text-center border rounded-md outline-none"
                    type="text" placeholder="Enter your github link" onChange={handlegitlink} value={gitlink}
                  />
                </div>
               
                <div className="flex flex-row justify-between items-center my-2 mx-0 w-full vs:flex-col vs:gap-2">
                  <div className="flex flex-row justify-center items-center">
                  
                    <BsLinkedin />
                    <h5 className="ml-1 font-semibold">Linkedin</h5>
                  </div>
                  <input
                    className="p-[.3rem] text-base border text-center rounded-md outline-none"
                    type="text" placeholder="Enter your linkedin link" onChange={handlelinkedinlink} value={linkedinlink}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-2 flex flex-col justify-center items-start w-full p-4 my-4 mr-8 ml-4 ml:m-4">
            <h1 className="font-manrope text-2xl font-bold mb-2">
              Information
            </h1>
            <div className="flex flex-col justify-center items-center p-5 w-full bg-foreground rounded-xl mb-4 shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
              <form className="flex-1 flex flex-col justify-start items-start w-3/4" onSubmit={handlesubmit}>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">
                    Full Name
                  </h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text"  value={name}
                  />
                </div>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">Email</h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text" value={email}
                  />
                </div>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">Mobile</h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text" onChange={handlemobile} value={mobile}
                  />
                </div>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">Address</h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text" onChange={handleaddress} value={address}
                  />
                </div>
                <div className="hidden">
                  {" "}
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleimagechange}
                  />
                </div>
                <button  className="btn-3" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
            <h1 className="font-manrope text-2xl font-bold mb-2">Projects</h1>
            <div className="flex justify-center items-center  p-2 m-4 bg-foreground rounded-xl shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
              <h2 className="text-sm font-medium">Add Project</h2>
              <button onClick={() => navigate("/projectform")}>
                <AiFillPlusCircle size="30px" color="#4923B4" />
              </button>
            </div>
            <div className="flex w-full flex-wrap justify-start">
                {false ? (
                  <div className="h-screen justify-center items-center text-5xl italic text-teal-600">
                    Loading
                  </div>
                ) : (
                  projectards.map((projectcard, i) => (
                    <Projectcard
                      key={i}
                      id={projectcard.id}
                      title={projectcard.title}
                      skillset={projectcard.skillset}
                      link={projectcard.link}
                      deleteFunc={deleteFunc}
                    />
                  ))
                )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;