import React from "react";
import Jobcard from "./components/Jobcard";
import Dashbar from "./components/Dashbar";

const jobcards = [
  {
    img: "/images/likedin.png",
    title: "UI Designer",
    skillset: ["CSS", "Javascript", "React"],
    amount: "100",
  },
  {
    img: "/images/git.png",
    title: "UI Designer",
    skillset: ["CSS", "Javascript", "React"],
    amount: "200",
  },
];

const Studentdashboard = () => {
  return (
    <>
      <Dashbar />
      <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
        <h1 className="font-manrope text-black text-center font-extrabold p-4 text-3xl vs:text-xl">
          On Going Jobs
        </h1>
        <div className="flex flex-col items-center justify-center">
          {jobcards.map((jobcard, i) => (
            <Jobcard
              key={i}
              title={jobcard.title}
              skillset={jobcard.skillset}
              amount={jobcard.amount}
            />
          ))}
        </div>
      </div>
      <hr></hr>
      <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
        <h1 className="font-manrope text-black text-center font-extrabold p-4 text-3xl vs:text-xl">
          Best Matches Jobs For You
        </h1>
        <div className="flex flex-col items-center  justify-center">
          {jobcards.map((jobcard, i) => (
            <Jobcard
              key={i}
              icon={jobcard.img}
              title={jobcard.title}
              skillset={jobcard.skillset}
              amount={jobcard.amount}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Studentdashboard;
