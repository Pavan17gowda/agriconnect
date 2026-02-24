import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GiEmptyWoodBucket } from "react-icons/gi";
import { GlobalContext } from "../context/GlobalState";
import AddDiseases from "./AddDiseases";
import { toast } from "react-toastify";

const DashDiseases = () => {
  const [editing, setEditing] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const { diseaseList, getAllDiseases } = useContext(GlobalContext);
  console.log(diseaseList);

  const handleDelete = async (diseaseId) => {
    try {
      const res = await fetch(`/api/diseases/deletedisease/${diseaseId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        getAllDiseases();
        toast.success("Deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (disease) => {
    setEditing(true);
    setSelectedDisease(disease);
  };
  return (
    <>
      {diseaseList && !editing ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#3b5a26] ">
            Diseases Available
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-[#c3f4a2]">
                <TableRow>
                  <TableCell>Disease Name</TableCell>
                  <TableCell>Symptmos</TableCell>
                  <TableCell>Transmission Mode</TableCell>
                  <TableCell>Prevalence Mode</TableCell>
                  <TableCell>Image</TableCell>

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
                {diseaseList &&
                  diseaseList.map((disease) => (
                    <TableRow
                      key={disease._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="bg-[#e9f5e0]"
                    >
                      <TableCell component="th" scope="row">
                        {disease.disease_name}
                      </TableCell>
                      <TableCell>{disease.symptoms}</TableCell>
                      <TableCell>{disease.transmission_mode}</TableCell>
                      <TableCell>{disease.prevalence_mode}</TableCell>
                      <TableCell>
                        <img
                          className="h-20 w-40 rounded  shadow-2xl"
                          src={disease.imageURL}
                          alt={disease.disease_name}
                        />
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-blue-500 hover:bg-blue-600 p-2 cursor-pointer"
                          onClick={() => handleEdit(disease)}
                        >
                          Edit
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-red-500 hover:bg-red-600 p-2 cursor-pointer"
                          onClick={() => handleDelete(disease._id)}
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
            Update Disease
          </h1>
          <AddDiseases disease={selectedDisease} />
        </div>
      )}
    </>
  );
};

export default DashDiseases;
