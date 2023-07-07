import React from "react";
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

const Jobdetail = () => {
  const { id } = useParams();
 
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
                  Time table generator
                </p>
              </div>
              <div className="flex w-2/5 flex-col">
                <h2 className="font-manrope font-bold text-black text-base">
                  Budget
                </h2>
                <p className=" flex items-center font-manrope text-grey text-sm">
                  <FaRupeeSign />
                  1000
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-manrope font-bold text-black text-base">
                Skills
              </h2>
              <p className="font-manrope text-grey text-sm">
                CSS, Javascript, React
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="font-manrope font-bold text-black text-base">
                Description
              </h2>
              <p className="font-manrope text-grey text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia vero officiis dolores consectetur aperiam saepe. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Atque
                ducimus dolorem voluptas error recusandae dolores voluptatibus
                corrupti in hic molestiae, similique dolor cupiditate sapiente
                vero esse maiores corporis numquam illo explicabo consequatur,
                blanditiis laborum aperiam exercitationem accusantium. Autem,
                temporibus enim corporis rem obcaecati a, sunt quos veniam,
                velit fuga aspernatur!
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
