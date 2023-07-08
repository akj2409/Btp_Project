import React, { useState } from "react";
import Dashbar from "./Dashbar";
import useFetch from "../../../hooks/useFetch";
import {
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material";


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
  ];
  
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
  
  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const Projectform = () => {
    const theme = useTheme();
    
    const [title, settitle] = useState("");
    const [link, setlink] = useState("");
    const [skillset, setskillset] = useState<string[]>([]);
    const [abc, setabc] = useState("");
    const values = {  title, link, skillset };
  
    const handleskill = (event: SelectChangeEvent<typeof skillset>) => {
      const {
        target: { value },
      } = event;
      console.log(value);
      setskillset(typeof value === "string" ? value.split(",") : value);
      var abc = "";
      for (var i = 0; i < value.length; i++) {
        if (i == value.length - 1) {
          abc = abc + value[i];
        } else {
          abc = abc + value[i] + ", ";
        }
      }
      // console.log(abc);
      setabc(abc);
    };
  
   
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      useFetch("/asdasd", {
        method: "POST",
        body: { title: title, link: link, skillset: skillset },
      });
    };
  
    const handletitle = (e: any) => {
      settitle(e.target.value);
    };
  
    const handlelink = (e: any) => {
      setlink(e.target.value);
    };

  
  return (
    <>
      <Dashbar />
      <div className=" section_padding h-screen bg-background flex justify-center s:px-0 vm:px-0">
      <div className=' bg-foreground flex justify-between items-center flex-col gap-10 m-auto rounded-lg mt-4 p-5 w-[70%]  shadow-[0px_1px_20px_rgba(14,30,37,0.12)] s:w-4/5 s:p-2.5 sm:w-6/12'>
      <div className="flex flex-col justify-center items-center text-xl font-manrope font-semibold">
        <img className="w-[62px] h-[62px]" src="/images/project2.jpg" alt="lock" />
      </div>
        <form className="flex w-[80%] flex-col gap-5 justify-evenly s:w-full vm:w-full" onSubmit={()=>{handleSubmit}} >
        <div>
              <h1 className="font-manrope font-bold text-black text-base mb-2">
                Enter your project's title
              </h1>
              <TextField
                id="title"
                name="title"
                variant="outlined"
                label="Title"
                type="text"
                onChange={handletitle}
                value={values.title}
                required
                fullWidth
              />
            </div>
            <div>
              <h1 className="font-manrope font-bold text-black text-base mb-2">
                Enter your project's Github link
              </h1>
              <TextField
                id="link"
                name="link"
                variant="outlined"
                label="Link"
                type="text"
                onChange={handlelink}
                value={values.link}
                required
                fullWidth
              />
            </div>
            <div>
              <h1 className="font-manrope font-bold text-black text-base mb-2">
                What technologies have been used in your project?
              </h1>
              <FormControl fullWidth>
                <InputLabel id="skill-label">Skills</InputLabel>
                <Select
                  labelId="skill-label"
                  id="skills"
                  multiple
                  fullWidth
                  required
                  value={values.skillset}
                  onChange={handleskill}
                  input={<OutlinedInput label="Skills" />}
                  MenuProps={MenuProps}
                >
                  {skills.map((skill) => (
                    <MenuItem
                      key={skill}
                      value={skill}
                      style={getStyles(skill, skillset, theme)}
                    >
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
        </form>
        <div className="flex flex-row justify-start mt-2">
        <button  className="btn-3 " type="submit"> Add Project </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Projectform;
