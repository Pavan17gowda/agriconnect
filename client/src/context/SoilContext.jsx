import React, { createContext, useEffect, useState } from "react";
const SoilContext = createContext();
export { SoilContext };

const SoilContextProvider = ({ children }) => {
  const [soilList, setSoilList] = useState([]);

  useEffect(() => {
    getAllSoils();
  }, []); // Empty dependency array to run useEffect only once on component mount

  const getAllSoils = async () => {
    try {
      const res = await fetch("/api/soils/getsoils", {
        method: "GET",
      });
      const soils = await res.json();
      console.log(soils);

      if (res.ok) {
        setSoilList(soils);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SoilContext.Provider value={{ soilList }}>{children}</SoilContext.Provider>
  );
};

export default SoilContextProvider;
