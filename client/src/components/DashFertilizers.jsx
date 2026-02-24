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
import AddFertilizers from "./AddFertilizers";
import { toast } from "react-toastify";

const DashFertilizers = () => {
  const [editing, setEditing] = useState(false);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const { fertilizerList, getAllFertilizers } = useContext(GlobalContext);

  const handleDelete = async (fertilizerId) => {
    try {
      const res = await fetch(
        `/api/fertilizers/deletefertilizer/${fertilizerId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        getAllFertilizers();
        toast.success("Fertilizer deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (fertilizer) => {
    setEditing(true);
    setSelectedFertilizer(fertilizer);
  };
  return (
    <>
      {fertilizerList && !editing ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#3b5a26] ">
            Fertilizers Available
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-[#c3f4a2]">
                <TableRow>
                  <TableCell>Fertilizer Name</TableCell>
                  <TableCell>Application Rate</TableCell>
                  <TableCell>Physical Form</TableCell>
                  <TableCell>Storage Condition</TableCell>
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
                {fertilizerList &&
                  fertilizerList.map((fertilizer) => (
                    <TableRow
                      key={fertilizer._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="bg-[#e9f5e0]"
                    >
                      <TableCell component="th" scope="row">
                        {fertilizer.fertilizer_name}
                      </TableCell>
                      <TableCell>{fertilizer.application_rate}</TableCell>
                      <TableCell>{fertilizer.physical_form}</TableCell>
                      <TableCell>{fertilizer.storage_condition}</TableCell>
                      <TableCell>{fertilizer.safety_caution}</TableCell>
                      <TableCell>
                        <img
                          className="h-20 w-40 rounded  shadow-2xl"
                          src={fertilizer.img_url}
                          alt={fertilizer.fertilizer_name}
                        />
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-blue-500 hover:bg-blue-600 p-2 cursor-pointer"
                          onClick={() => handleEdit(fertilizer)}
                        >
                          Edit
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-red-500 hover:bg-red-600 p-2 cursor-pointer"
                          onClick={() => handleDelete(fertilizer._id)}
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
          <AddFertilizers fertilizer={selectedFertilizer} />
        </div>
      )}
    </>
  );
};

export default DashFertilizers;
