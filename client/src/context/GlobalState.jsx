import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GlobalContext = createContext();
export { GlobalContext };

const GlobalProvider = ({ children }) => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [soilList, setSoilList] = useState([]);
  const [fertilizerList, setFertilizerList] = useState([]);
  const [cropList, setCropList] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);
  const [manureAdminList, setManureAdminList] = useState([]);
  const [pesticideList, setPesticideList] = useState([]);
  const [manureList, setManureList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [selectedManure, setSelectedMannure] = useState(null);
  const [tractorsByUser, setTractorsByUser] = useState([]);
  const [tractors, setTractors] = useState([]);
  const [nurseries, setNurseries] = useState([]);
  const [nurseriesByUser, setNurseriesByUser] = useState([]);

  useEffect(() => {
    getCurrentLocation();
    getAllSoils();
    getAllCrops();
    getAllFertilizers();
    getAllDiseases();
    getAllManures();
    getAllPesticides();
    getTractors();
    fetchNurseries();
    // sendNotification();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      getManuresByUser();
      getBookingsByUser();
      getTractorsByUser();
      fetchNuseriesByUser();
    }
  }, [currentUser]);

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    // Round the distance to 1 decimal place
    return parseFloat(distance.toFixed(1));
  };

  const getAllSoils = async () => {
    try {
      const res = await fetch("/api/soils/getsoils", {
        method: "GET",
      });
      const soils = await res.json();

      if (res.ok) {
        setSoilList(soils);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Soil list fetched successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCrops = async () => {
    try {
      const res = await fetch("/api/crops/getallcrops", {
        method: "GET",
      });
      const crops = await res.json();
      if (res.ok) {
        setCropList(crops);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Crop list fetched successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFertilizers = async () => {
    try {
      const res = await fetch("/api/fertilizers/getallfertilizers", {
        method: "GET",
      });
      const fertilizers = await res.json();
      if (res.ok) {
        setFertilizerList(fertilizers);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Fertilizer list fetched successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDiseases = async () => {
    try {
      const res = await fetch("/api/diseases/getalldiseases", {
        method: "GET",
      });
      const diseases = await res.json();
      if (res.ok) {
        setDiseaseList(diseases);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Disease list fetched successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllManures = async () => {
    try {
      const res = await fetch("/api/manures/getmanures", {
        method: "GET",
      });
      const manures = await res.json();
      if (res.ok) {
        setManureAdminList(manures);
        console.log(
          new Date().toLocaleDateString(),
          "Manures fetched successfully"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPesticides = async () => {
    try {
      const res = await fetch("/api/pesticides/getallpesticides", {
        method: "GET",
      });
      const pesticides = await res.json();
      if (res.ok) {
        setPesticideList(pesticides);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Pesticide list fetched successfully:`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getManuresByUser = async () => {
    if (!currentUser || !currentUser._id) return;
    try {
      const res = await fetch(`/api/manures/getbyuser/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const manures = await res.json();
      setManureList(manures);
      if (res.ok) {
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Manures by user are  fetched successfully:`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTractorsByUser = async () => {
    if (!currentUser || !currentUser._id) return;
    try {
      const res = await fetch(`/api/tractors/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const tractors = await res.json();
      if (res.ok) {
        setTractorsByUser(tractors);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Tractors by user are  fetched successfully:`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTractors = async () => {
    try {
      const res = await fetch(`/api/tractors/`, {
        method: "GET",
        credentials: "include",
      });
      const tractorsRes = await res.json();
      if (res.ok) {
        setTractors(tractorsRes);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Tractors fetched successfully:`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingsByUser = async () => {
    if (!currentUser || !currentUser._id) return;
    try {
      const res = await fetch(
        `/api/bookings/bookingsbyuser/${currentUser._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const booking = await res.json();
      if (res.ok) {
        setBookingsList(booking);
        console.log(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${
            booking.length
          } Bookings fetched successfully:`
        );
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const setMannure = (manure) => {
    setSelectedMannure(manure);
  };

  const fetchNurseries = async () => {
    try {
      const response = await fetch("/api/nursery/get-nurseries");
      if (!response.ok) {
        throw new Error("Failed to fetch nurseries.");
      }
      const data = await response.json();
      setNurseries(data);
      console.log(
        `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Nursery details fetched successfully:`
      );

      // setLoading(false);
    } catch (error) {
      console.error("Error fetching nurseries:", error);
      // setLoading(false);
    }
  };

  const sendNotification = async (requesterId, status, booking) => {
    const message = `Your booking request has been ${status} for ${booking.itemType}.`;

    const notification = {
      userId: requesterId,
      message,
      type: status === "accepted" ? "success" : "error",
    };

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });

      if (response.ok) {
        toast.success(`Notification sent to requester: ${status}`);
      } else {
        toast.error("Failed to send notification");
      }
    } catch (error) {
      toast.error("Failed to send notification");
      console.log("Error sending notification:", error);
    }
  };

  const fetchNuseriesByUser = async () => {
    if (!currentUser || !currentUser._id) return;
    try {
      const response = await fetch(
        `/api/nursery/nurseriesbyuser/${currentUser._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch nurseries.");
      }
      const data = await response.json();
      setNurseriesByUser(data);
      console.log(
        `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Nurseries by user are  fetched successfully:`
      );
    } catch (error) {
      console.error("Error fetching nurseries:", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [bookingsList]); // Watches for changes in bookingsList

  return (
    <GlobalContext.Provider
      value={{
        soilList,
        fertilizerList,
        cropList,
        diseaseList,
        manureAdminList,
        getCurrentLocation,
        getTractorsByUser,
        getTractors,
        fetchNurseries,
        fetchNuseriesByUser,
        nurseriesByUser,
        tractors,
        nurseries,
        tractorsByUser,
        manureList,
        pesticideList,
        selectedManure,
        setMannure,
        getAllFertilizers,
        // getCurrentLocation,
        getAllSoils,
        getAllCrops,
        getAllPesticides,
        getAllDiseases,
        userLongitude,
        userLatitude,
        calculateDistance,
        getManuresByUser,
        getAllManures,
        bookingsList,
        getBookingsByUser,
        sendNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
