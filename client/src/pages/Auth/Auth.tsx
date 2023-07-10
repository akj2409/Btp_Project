import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField, InputAdornment, IconButton, MenuItem } from "@mui/material";
import Navbar from "../../common/Navbar";
import { firstSliceAngleProperty } from "@syncfusion/ej2/documenteditor";

const initialState = {firstname: '', lastname: '', role: '', email: '', password: '', confirmpassword:''};
const register_url = 'http://localhost:5000/users/newuser' ;
const login_url = 'http://localhost:5000/users/login' ;




const Auth = () => {
  const [isSignup, setisSignup] = useState(false);

  const [showpassword, setshowpassword] = useState(false);

  // const [role, setrole] = useState("");
  const [formData, setformData] = useState(initialState);
  
  const handleChange = (e : any) =>{
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(isSignup){
      if(!(formData.password === formData.confirmpassword)){
        console.log("Password and Confirm Password Should be same");
        return ;
      }
      let role = formData.role === '1' ? "Student" : "Client" ;
      const object = {
        "first_name":formData.firstname,
        "last_name":formData.lastname,
        "email":formData.email,
        "role":role,
        "password":formData.password
      }
      await fetch(register_url , {
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(object)
      }).then(async(res)=>{
        const data = await res.json();
        console.log(data);
        localStorage.setItem("token" , data.token)
        if(role==="Student"){
          window.location.replace(`http://localhost:5173/studentdashboard`);
        }else{
          window.location.replace('http://localhost:5173/dashboard')
        }
      }).catch(err=>{
        console.log(err);
      })
    }else {
      const object = {
        "email":formData.email,
        "password":formData.password
      }
      await fetch(login_url , {
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(object)
      }).then(async(res)=>{
        const data = await res.json();
        console.log(data);
        localStorage.setItem("token" , data.token)
        if(data.sucess){
          if(data.user.role==="Student"){
            window.location.replace(`http://localhost:5173/studentdashboard`);
          }else{
            window.location.replace('http://localhost:5173/dashboard')
          }
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }

  const handleshowpassword = () =>
    setshowpassword((prevshowpassword) => !prevshowpassword);

  const switchMode = () => {
    setisSignup((previsSignup) => !previsSignup);
    setshowpassword(false);
  };

  const Endadornment = ({ showpassword }: { showpassword: any }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={handleshowpassword}>
          {showpassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  const rolechange = (e: {
    target: {
      [x: string]: any; value: React.SetStateAction<string> 
};
  }) => {
    setformData({...formData, [e.target.name]: e.target.value})
  };
  return (
    <>
    <Navbar/>
    <div className=" bg-foreground flex flex-col gap-10 m-auto rounded-lg mt-16 p-5 w-[30%] h-[80%] shadow-[0px_1px_20px_rgba(14,30,37,0.12)] s:w-4/5 s:p-2.5 sm:w-6/12">
      <div className="flex flex-col justify-center items-center text-xl font-manrope font-semibold">
        <img className="w-[62px] h-[62px]" src="/images/lock.png" alt="lock" />
        <h3>{isSignup ? "Sign Up" : "Sign In"}</h3>
      </div>
      <form className="flex flex-col gap-5 justify-evenly z-1" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between z-0">
          {isSignup && (
            <>
              <div className="mr-1">
                <TextField
                  name="firstname"
                  variant="outlined"
                  label="First name"
                  type="text"
                  required
                  fullWidth
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <TextField
                  name="lastname"
                  variant="outlined"
                  label="Last name"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
        {isSignup && (
          <>
            <TextField
              variant="outlined"
              name="role"
              label="Select your role"
              required
              select
              value={formData.role}
              onChange={handleChange}
              fullWidth

            >
              <MenuItem value="1">Student</MenuItem>
              <MenuItem value="0">Client</MenuItem>
            </TextField>
          </>
        )}
        <div>
          <TextField
            name="email"
            variant="outlined"
            label="Email Address"
            type="email"
            required
            fullWidth
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type={showpassword ? "text" : "password"}
            required
            fullWidth
            onChange={handleChange}
            InputProps={{
              endAdornment: <Endadornment showpassword={showpassword} />,
            }}
          />
        </div>
        {isSignup && (
          <>
            <div>
              <TextField
                name="confirmpassword"
                variant="outlined"
                label="Confirm password"
                type="password"
                required
                fullWidth
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div>
          <button className="btn-2" type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
      <div>
        <button
          className="text-indigo-500 w-full p-2 font-medium rounded text-sm  cursor-pointer bg-foreground font-manrope outline-none border-none"
          onClick={switchMode}
        >
          {isSignup
            ? `Already have an account? Sign In`
            : `Don't have an account? Sign Up`}
        </button>
      </div>
    </div>
    </>
  );
};

export default Auth;
