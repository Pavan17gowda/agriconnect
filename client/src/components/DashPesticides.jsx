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
import AddPesticides from "./AddPesticides";
import { toast } from "react-toastify";

const DashPesticides = () => {
  const [editing, setEditing] = useState(false);
  const [selectedPesticide, setSelectedPesticide] = useState(null);
  const { pesticideList, getAllPesticides } = useContext(GlobalContext);

  const handleDelete = async (pesticideId) => {
    try {
      const res = await fetch(
        `/api/pesticides/deletepesticide/${pesticideId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        getAllPesticides();
        toast.success("Deleted successfuly");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (pesticide) => {
    setEditing(true);
    setSelectedPesticide(pesticide);
  };
  return (
    <>
      {pesticideList && !editing ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#3b5a26] ">
            Pesticides Available
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-[#c3f4a2]">
                <TableRow>
                  <TableCell>Pesticide Name</TableCell>
                  <TableCell>Application Rate</TableCell>
                  <TableCell>Target Pest</TableCell>
                  <TableCell>Safety Caution</TableCell>
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
                {pesticideList &&
                  pesticideList.map((pesticide) => (
                    <TableRow
                      key={pesticide._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="bg-[#e9f5e0]"
                    >
                      <TableCell component="th" scope="row">
                        {pesticide.pesticide_name}
                      </TableCell>
                      <TableCell>{pesticide.application_rate}</TableCell>
                      <TableCell>{pesticide.pesticide_name}</TableCell>
                      <TableCell>{pesticide.safety_caution}</TableCell>
                      <TableCell>
                        <img
                          className="h-20 w-40 rounded  shadow-2xl"
                          src={pesticide.imageURL}
                          alt={pesticide.pesticide_name}
                        />
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-blue-500 hover:bg-blue-600 p-2 cursor-pointer"
                          onClick={() => handleEdit(pesticide)}
                        >
                          Edit
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-red-500 hover:bg-red-600 p-2 cursor-pointer"
                          onClick={() => handleDelete(pesticide._id)}
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
            Update Fertilizer
          </h1>
          <AddPesticides pesticide={selectedPesticide} />
        </div>
      )}
    </>
  );
};

export default DashPesticides;
