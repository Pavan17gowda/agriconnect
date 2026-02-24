import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GiEmptyWoodBucket } from "react-icons/gi";
import { GlobalContext } from "../context/GlobalState";
import AddSoil from "./AddSoil";
const DashSoils = () => {
  const [editing, setEditing] = useState(false);
  const [selectedSoil, setSelectedSoil] = useState(null);
  const { soilList } = useContext(GlobalContext);

  const handleEdit = (soil) => {
    setEditing(true);
    setSelectedSoil(soil);
  };
  return (
    <>
      {soilList && !editing ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#3b5a26] ">
            Soils Available
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-[#c3f4a2]">
                <TableRow>
                  <TableCell>Soil Name</TableCell>
                  <TableCell>Crops Grown</TableCell>
                  <TableCell>
                    <div className="flex justify-center rounded text-blue-50 bg-blue-400 p-2">
                      Update
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center rounded text-white bg-red-400 p-2">
                      Delete
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {soilList &&
                  soilList.map((soil) => (
                    <TableRow
                      key={soil.soil_type}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="bg-[#e9f5e0]"
                    >
                      <TableCell component="th" scope="row">
                        {soil.soil_type}
                      </TableCell>
                      <TableCell>
                        {soil.crops_grown.map((crop) => (
                          <ul key={crop._id}>
                            <li>
                              <div className=" flex content-center items-center gap-3">
                                {" "}
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="#4CAF50" // Color of the icon
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="12" cy="12" r="8" />
                                </svg>
                                {crop.crop_name}
                              </div>
                            </li>
                          </ul>
                        ))}
                      </TableCell>

                      {/* <TableCell>
                        <img
                          className="h-20 w-40"
                          src={crop.img_url}
                          alt={crop.crop_name}
                        />
                      </TableCell> */}
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-blue-500 hover:bg-blue-600 p-2 cursor-pointer"
                          onClick={() => handleEdit(soil)}
                        >
                          Edit
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-red-500 hover:bg-red-600 p-2 cursor-pointer"
                          onClick={() => handleDelete(soil._id)}
                        >
                          <GiEmptyWoodBucket className="font-bold text-2xl" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#3b5a26] ">
            Update Soil
          </h1>
          <AddSoil soil={selectedSoil} />
        </div>
      )}
    </>
  );
};

export default DashSoils;
