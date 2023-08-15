import React, { useEffect, useState } from "react";
import Jobcard from "./components/Jobcard";
import { useNavigate } from "react-router-dom";
import Dashbar from "./components/Dashbar";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Job } from "../../interfaces/Data";

const skills = [
  "HTML",
  "CSS",
  "Js",
  "Next.Js",
  "React.Js",
  "MUI",
  "PHP",
  "Posgrey SQL",
  "Mongo DB",
  "Node.Js",
  "Django",
  "Swift",
  "Java",
  "Kotlin",
  "React Native",
  "Flutter",
  "Python",
  "Tensorflow",
  "PyTorch",
  "OpenCV",
  "Scikit-Learn",
  "Numpy",
  "Pandas",
];

const categoriess = [
  { title: "All Jobs", value: "" },
  { title: "Web App" },
  { title: "Android App" },
  { title: "Machine Learning" },
  { title: "Artificial Intelligence" },
  { title: "System Design" },
  { title: "Video Graphics" },
  { title: "Editing" },
];

interface JobDataResponse {
  success: boolean;
  message: string;
  jobs: Job[];
}

function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

const Studentdashboard = () => {
  
  const [showJobs, setShowJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState({
    skills: [""],
    category: "",
  });

  const [appliedjobdata, loadingAppliedjobdata] = useFetch<JobDataResponse>(
    "http://localhost:5000/jobs/applied_job",
    {
      initial: { success: true, message: "", jobs: [] },
    }
  );

  const [jobdata, loadingJobdata] = useFetch<JobDataResponse>(
    "http://localhost:5000/jobs/alljobs",
    {
      initial: { success: true, message: "", jobs: [] },
    }
  );

  useEffect(() => {
    setFilter((f) => {
      return { ...f, skills: [] };
    });
  }, []);

  useEffect(() => {
    setShowJobs(jobdata.jobs);
  }, [loadingJobdata]);

  useEffect(() => {
    const filteredJobs: Job[] = [];
    for (const job of jobdata.jobs) {
      let flag = true;

      if (filter.category && filter.category !== job.category) {
        flag = false;
        continue;
      }
      if (filter.skills.length > 0) {
        let flag1 = false;

        job.skills.forEach((skill) => {
          if (filter.skills.includes(skill)) {
            flag1 = true;
          }
        });

        if (!flag1) {
          flag = false;
        }
      }
      // in the end compare flag value and push to filteredJobs
      if (flag) {
        filteredJobs.push(job);
      }
    }
    setShowJobs(filteredJobs);
  }, [filter]);

  const navigate = useNavigate();
  const theme = useTheme();
  console.log(jobdata.jobs);
  console.log("apply",appliedjobdata.jobs);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
  }
 

  return (
    <>
      <Dashbar />
      <div className="h-screen bg-background">
        <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
          <h1 className="font-manrope text-black text-center font-extrabold p-4 text-3xl vs:text-xl">
            Applied Jobs
          </h1>
          <div className="flex flex-col items-center  justify-center">
            {/* {!loadingAppliedjobdata && */}
              {appliedjobdata.jobs.length > 0 ? (
                appliedjobdata.jobs.map((job, i) => (
                  <Jobcard key={i} {...job} property={false}  />
                ))
              ) : (
                <h1>No Jobs Applied Yet</h1>
              )}
          </div>
        </div>
        <hr></hr>
        <div className="px-24 py-10 bg-background flex flex-col justify-center m:px-16 s:px-8">
          <div className="flex flex-col justify-center gap-2 items-center  ">
            <h1 className="font-manrope text-black text-center font-extrabold p-4  text-3xl vs:text-xl">
              Best Matches Jobs For You
            </h1>
            <div className="flex flex-row gap-2 justify-center items-center xm:flex-col">
              <FormControl sx={{ minWidth: 160 }} size="small">
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  required
                  fullWidth
                  label="Select Category"
                  value={filter.category}
                  onChange={(event) =>
                    setFilter((f) => {
                      return { ...f, category: event.target.value };
                    })
                  }
                >
                  {categoriess.map((category, i) => (
                    <MenuItem
                      key={i}
                      value={
                        category.value === undefined
                          ? category.title
                          : category.value
                      }
                      style={getStyles(theme)}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 260 }} size="small">
                <InputLabel id="skill-label"> Select Skills</InputLabel>
                <Select
                  labelId="skill-label"
                  id="skills"
                  multiple
                  fullWidth
                  label="Select Skills"
                  value={filter.skills}
                  className="max-h-[50vh]"
                  onChange={(event) => {
                    setFilter((f) => {
                      return { ...f, skills: event.target.value as string[] };
                    });
                  }}
                  MenuProps={{ className: "max-h-[50vh]" }}
                >
                  {skills.map((skill) => (
                    <MenuItem
                      key={skill}
                      value={skill}
                      style={getStyles(theme)}
                    >
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex  flex-col items-center  justify-center">
            {!loadingJobdata &&
              showJobs.map((job, i) => (
                <Jobcard key={i} {...job} property={true}  />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Studentdashboard;
