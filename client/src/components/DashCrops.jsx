import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GiEmptyWoodBucket } from "react-icons/gi";
import AddCrop from "./AddCrop";

const DashCrops = () => {
  const [cropList, setCropList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    getAllCrops();
  }, []);

  const getAllCrops = async () => {
    try {
      const res = await fetch("/api/crops/getallcrops", {
        method: "GET",
      });
      const crops = await res.json();
      console.log(crops);

      if (res.ok) {
        setCropList(crops);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/crops/deletecrop/${id}`, {
        method: "DELETE",
      });
      getAllCrops();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (crop) => {
    setEditing(true);
    setSelectedCrop(crop);
  };
  return (
    <>
      {cropList && !editing ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-4 text-[#3b5a26] ">
            Crops Available
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-[#c3f4a2]">
                <TableRow>
                  <TableCell>Crop Name</TableCell>
                  <TableCell>Sowing Season</TableCell>
                  <TableCell>Duration of crop</TableCell>
                  <TableCell>Harvesting Season</TableCell>
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
                {cropList &&
                  cropList.map((crop) => (
                    <TableRow
                      key={crop.crop_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="bg-[#e9f5e0]"
                    >
                      <TableCell component="th" scope="row">
                        {crop.crop_name}
                      </TableCell>
                      <TableCell>{crop.sowing_period}</TableCell>
                      <TableCell>{crop.duration_of_crop}</TableCell>
                      <TableCell>{crop.harvesting_period}</TableCell>
                      <TableCell>
                        <img
                          className="h-20 w-40 rounded  shadow-2xl"
                          src={crop.img_url}
                          alt={crop.crop_name}
                        />
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-blue-500 hover:bg-blue-600 p-2 cursor-pointer"
                          onClick={() => handleEdit(crop)}
                        >
                          Edit
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex justify-center rounded text-white bg-red-500 hover:bg-red-600 p-2 cursor-pointer"
                          onClick={() => handleDelete(crop._id)}
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
            Update Crop
          </h1>
          <AddCrop crop={selectedCrop} />
        </div>
      )}
    </>
  );
};

export default DashCrops;
