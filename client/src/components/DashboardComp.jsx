import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSeedling, FaHeartbeat, FaSyringe, FaTractor } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiSprout, GiFertilizerBag, GiSeedling } from "react-icons/gi";
import { GlobalContext } from "../context/GlobalState";
import { GiCarnivorousPlant } from "react-icons/gi";

export default function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);
  const {
    soilList,
    cropList,
    manureAdminList,
    fertilizerList,
    diseaseList,
    pesticideList,
    manureList,
    getManuresByUser,
    tractors,
    tractorsByUser,
    nurseries,
    nurseriesByUser,
  } = useContext(GlobalContext);

  useEffect(() => {
    {
      !currentUser.isAdmin && getManuresByUser();
    }
  }, [currentUser]);

  return (
    <div className="p-6 md:mx-auto max-w-screen-lg">
      <div className="grid grid-cols-1 md:grid-rows-1 gap-6">
        {!currentUser.isAdmin ? (
          <div className="flex flex-col gap-3">
            <Link to="/dashboard?tab=manuresbyuser">
              <div className="flex justify-between items-center p-6 bg-[#f3c9aa] rounded-lg shadow-lg border border-gray-200  ">
                <GiSprout className="flex items-center justify-center w-16 h-16 text-[#422006] rounded-full bg-white p-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {" "}
                  Manures posted by you
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {manureList.length}
                </p>
              </div>
            </Link>
            <Link to="/dashboard?tab=yourtractors">
              <div className="flex justify-between items-center p-6 bg-[#f7aca9] rounded-lg shadow-lg border border-gray-200  ">
                <FaTractor className="flex items-center justify-center w-16 h-16 text-[#d9534f] rounded-full bg-white p-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {" "}
                  Tractors registered by you
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {tractorsByUser.length}
                </p>
              </div>
            </Link>
            <Link to="/dashboard?tab=nurseriesbyuser">
              <div className="flex justify-between items-center p-6 bg-[#80f476] rounded-lg shadow-lg border border-gray-200  ">
                <GiCarnivorousPlant className="flex items-center justify-center w-16 h-16 text-green-700 rounded-full bg-white p-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {" "}
                  Nurseries registered by you
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {nurseriesByUser.length}
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-pretty text-stone-600 ">
                Agri Help
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Link to="/dashboard?tab=totalsoils">
                  <div className="flex justify-between items-center p-6 bg-[#f5a66d] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      className=" flex items-center justify-center w-16 h-16 text-[#3b5a26] rounded-full bg-white p-2"
                    >
                      <rect
                        x="0"
                        y="50"
                        width="100"
                        height="25"
                        fill="#8B4513"
                      />
                      <rect
                        x="0"
                        y="75"
                        width="100"
                        height="25"
                        fill="#654321"
                      />

                      <path
                        d="M50 50 C47 47, 40 40, 45 35 C50 30, 55 40, 50 50 Z"
                        fill="#228B22"
                      />
                      <path
                        d="M50 50 C53 47, 60 40, 55 35 C50 30, 45 40, 50 50 Z"
                        fill="#228B22"
                      />
                      <rect
                        x="48"
                        y="50"
                        width="4"
                        height="10"
                        fill="#8B4513"
                      />
                    </svg>

                    {/* <FontAwesomeIcon
                      className="flex items-center justify-center w-14 h-16 text-[#8B4513] rounded-full bg-white p-1"
                      icon={faMound}
                      size="2x"
                    /> */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Soils in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {soilList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=totalcrops">
                  <div className="flex justify-between items-center p-6 bg-[#b4f588] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaSeedling className="flex items-center justify-center w-16 h-16 text-[#3b5a26] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Crops in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {cropList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=totalfertilizers">
                  <div className="flex justify-between items-center p-6 bg-[#c1f0ac] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <GiFertilizerBag className="flex items-center justify-center w-16 h-16 text-[#4c8f2e] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Fertilizers in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {fertilizerList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=totaldiseases">
                  <div className="flex justify-between items-center p-6 bg-[#f69b98] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaHeartbeat className="flex items-center justify-center w-16 h-16 text-[#d9534f] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total diseases in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {diseaseList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=totalpesticides">
                  <div className="flex justify-between items-center p-6 bg-[#99c4f3] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaSyringe className="flex items-center justify-center w-16 h-16 text-[#007bff] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total pesticides in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {pesticideList.length}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <hr />
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-pretty text-stone-600 ">
                Agri Services
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Link to="/dashboard?tab=totalmanures">
                  <div className="flex justify-between items-center p-6 bg-[#f0be9a] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <GiSprout className="flex items-center justify-center w-16 h-16 text-[#7B3F00] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Manures avilable in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {manureAdminList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=alltractor">
                  <div className="flex justify-between items-center p-6 bg-[#c1f0ac] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <GiFertilizerBag className="flex items-center justify-center w-16 h-16 text-[#4c8f2e] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Tractors in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {tractors.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=nurseries">
                  <div className="flex justify-between items-center p-6 bg-[#f69b98] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaHeartbeat className="flex items-center justify-center w-16 h-16 text-[#d9534f] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Nurseries in database
                    </h3>
                    {/* {console.log(nurseries)} */}

                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {nurseries.length}
                    </p>
                  </div>
                </Link>
                {/* <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#99c4f3] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaSyringe className="flex items-center justify-center w-16 h-16 text-[#007bff] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total pesticides in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {pesticideList.length}
                    </p>
                  </div>
                </Link> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
