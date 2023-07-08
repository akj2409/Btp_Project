import React, { useRef, useState } from "react";
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";
import Dashbar from "./Dashbar";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Projectcard from "./Projectcard";

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
  };

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
                  Monis Khan
                </h3>
                <p className="text-sm text-grey">Full Stack Developer</p>
                <p className="text-sm text-grey">Gwalior, India</p>
              </div>

              <div className="flex flex-col justify-center items-center m-4 py-0 px-5 w-full">
                <div className="flex flex-row justify-between items-center my-2 mx-0 w-full">
                  <div className="flex flex-row justify-center items-center">
                    {/* <img src={git} alt="" /> */}
                    <BsGithub />
                    <h5 className="ml-1 font-semibold">Github</h5>
                  </div>
                  <p>http://github</p>
                </div>
                <div className="flex flex-row justify-between items-center my-2 mx-0 w-full">
                  <div className="flex flex-row justify-center items-center">
                    {/* <img src={twitter} alt="" /> */}
                    <BsTwitter />
                    <h5 className="ml-1 font-semibold">Twitter</h5>
                  </div>
                  <p>http://twitter</p>
                </div>
                <div className="flex flex-row justify-between items-center my-2 mx-0 w-full">
                  <div className="flex flex-row justify-center items-center">
                    {/* <img src={likedin} alt="" /> */}
                    <BsLinkedin />
                    <h5 className="ml-1 font-semibold">Linkedin</h5>
                  </div>
                  <p>http://linkedin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-2 flex flex-col justify-center items-start w-full p-4 my-4 mr-8 ml-4 ml:m-4">
            <h1 className="font-manrope text-2xl font-bold mb-2">
              Information
            </h1>
            <div className="flex flex-col justify-center items-center p-5 w-full bg-foreground rounded-xl mb-4 shadow-[0px_1px_20px_rgba(14,30,37,0.12)]">
              <form className="flex-1 flex flex-col justify-start items-start w-3/4">
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">
                    Full Name
                  </h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text"
                  />
                </div>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">Email</h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text"
                  />
                </div>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">Mobile</h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text"
                  />
                </div>
                <div className="flex flex-col justify-start items-start my-2 mx-0 w-full">
                  <h5 className="font-manrope text-base font-bold">Address</h5>
                  <input
                    className="w-full p-[.3rem] text-base  outline-none border-b-2 border-black"
                    type="text"
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
                <button className="btn-3" type="button">
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
            <div className="flex flex-wrap justify-start">
                {false ? (
                  <div className="h-screen justify-center items-center text-5xl italic text-teal-600">
                    Loading
                  </div>
                ) : (
                  projectcards.map((projectcard, i) => (
                    <Projectcard
                      key={i}
                      title={projectcard.title}
                      skillset={projectcard.skillset}
                      link={projectcard.link}
                      
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
