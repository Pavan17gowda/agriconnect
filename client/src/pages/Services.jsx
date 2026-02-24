import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OrganicManure from "../components/OrganicManure";
import { GiPlantWatering, GiSprout } from "react-icons/gi";
import { FaTractor } from "react-icons/fa";
import AgricultureIcon from "@mui/icons-material/Agriculture";

import YardIcon from "@mui/icons-material/Yard";

import NurseryManagement from "../components/Nursery/NurseryManagement";
import TractorManagement from "../components/tractor/TractorManagement";
import NurseryCropList from "../components/Nursery/NurseryCropList";
// import { Tractor } from "";

const Services = () => {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || null; // Default to 'dash' if no tab is found
    setTab(selectedTab);
  }, [location.search]);

  return (
    <>
      {!tab && (
        <div className="outer-containerbg-gradient-to-br bg-white dark:bg-black p-10 min-h-screen flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#f54646]">
            Agricultural Services
          </h1>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center"> */}
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-6 justify-center items-center">
            {/* Manure Card */}
            <div className="cont4 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/services?tab=manures"
                className="flex flex-col items-center"
              >
                <GiSprout className="h-10 w-10 text-[#422006] mb-3" />
                <div className="container4 text-[#422006] text-xl font-bold">
                  Organic Manures
                </div>
                <div className="disc text-[#422006]  mt-2 text-center">
                  Manure Management feature to track, apply, and exchange
                  various types of manure for optimal crop health
                </div>
              </Link>
            </div>
            {/* Tractor Card */}
            <div className="cont4 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/services?tab=tractors"
                className="flex flex-col items-center"
              >
                <FaTractor className="h-10 w-10 mb-3 text-red-600" />

                <div className="container4 text-red-600 text-xl font-bold">
                  Tractor Services
                </div>
                <div className="disc text-red-600 mt-2 text-center">
                  Streamline your farming operations with our efficient tractor
                  booking and management service, ensuring seamless access and
                  optimal utilization of agricultural machinery.
                </div>
              </Link>
            </div>
            {/* Nursery Card */}
            <div className="cont4 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/services?tab=nurseries"
                className="flex flex-col items-center"
              >
                <GiPlantWatering className="h-10 w-10 mb-3 text-green-600" />

                <div className="container4 text-green-600 text-xl font-bold">
                  Nursery Management
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Manure Management feature to track, apply, and exchange
                  various types of manure for optimal crop health
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      {tab && (
        <>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-green-500 rounded-lg  hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600"
            onClick={() => setSidebar(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-${
              sidebar ? "0" : "full"
            } `}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-20 overflow-y-auto bg-green-50 dark:bg-green-800">
              <div
                onClick={() => setSidebar(false)}
                className="flex float-end p-2 text-green-900  hover:text-white hover:bg-green-500 hover:rounded-full font-bold cursor-pointer "
              >
                X
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/services"
                    className="flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <span className="ms-3">Agri Services</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services?tab=manures"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "manures" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <GiSprout className="h-5 w-5  text-[#422006]  transition duration-75  group-hover:text-[#422006] dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 text-[#422006] whitespace-nowrap">
                      Manure
                    </span>
                  </Link>
                  <Link
                    to="/services?tab=tractors"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "tractors" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <AgricultureIcon className="h-5 w-5  text-red-500  transition duration-75  group-hover:text-red-500 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 text-red-500 whitespace-nowrap">
                      Tractor Management
                    </span>
                  </Link>
                  <Link
                    to="/services?tab=nurseries"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "nurseries"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <GiPlantWatering className="h-5 w-5  text-green-600  transition duration-75  group-hover:text-green-600 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 text-green-600 whitespace-nowrap">
                      Nursery Management
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <div
            className={
              sidebar
                ? "p-4 ml-64 bg-white dark:bg-black"
                : "p-4  bg-white dark:bg-black"
            }
          >
            {tab === "manures" && <OrganicManure />}
            {tab === "tractors" && <TractorManagement />}

            {tab === "nurseries" && <NurseryManagement />}
            {tab === "croplist" && <NurseryCropList />}
          </div>
        </>
      )}
    </>
  );
};

export default Services;
