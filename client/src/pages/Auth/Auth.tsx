import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField, InputAdornment, IconButton, MenuItem } from "@mui/material";
import Navbar from "../../common/Navbar";

const Auth = () => {
  const [isSignup, setisSignup] = useState(false);

  const [showpassword, setshowpassword] = useState(false);

  const [role, setrole] = useState("");

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
    target: { value: React.SetStateAction<string> };
  }) => {
    setrole(e.target.value);
  };
  return (
    <>
    <Navbar/>
    <div className=" bg-foreground flex flex-col gap-10 m-auto rounded-lg mt-16 p-5 w-[30%] h-[80%] shadow-[0px_1px_20px_rgba(14,30,37,0.12)] s:w-4/5 s:p-2.5 sm:w-6/12">
      <div className="flex flex-col justify-center items-center text-xl font-manrope font-semibold">
        <img className="w-[62px] h-[62px]" src="/images/lock.png" alt="lock" />
        <h3>{isSignup ? "Sign Up" : "Sign In"}</h3>
      </div>
      <form className="flex flex-col gap-5 justify-evenly z-1">
        <div className="flex flex-row justify-between z-0">
          {isSignup && (
            <>
              <div className="mr-1">
                <TextField
                  name="first name"
                  variant="outlined"
                  label="First name"
                  type="text"
                  required
                  fullWidth
                />
              </div>
              <div className="ml-1">
                <TextField
                  name="last name"
                  variant="outlined"
                  label="Last name"
                  type="text"
                  fullWidth
                />
              </div>
            </>
          )}
        </div>
        {isSignup && (
          <>
            <TextField
              variant="outlined"
              label="Select your role"
              required
              select
              value={role}
              onChange={rolechange}
              fullWidth
            >
              <MenuItem value="s">Student</MenuItem>
              <MenuItem value="o">Client</MenuItem>
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
