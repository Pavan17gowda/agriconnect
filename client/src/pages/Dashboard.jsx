import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardComp from "../components/DashboardComp";
import DashComments from "../components/DashComments";
import DashProfile from "../components/DashProfile";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import AddManure from "../components/AddManure";
import DashManure from "../components/DashManure";
import DashCrops from "../components/DashCrops";
import AddCrop from "../components/AddCrop";
import DashTotalManure from "../components/DashTotalManure";
import {
  FaHeartbeat,
  FaSyringe,
  FaUser,
  FaTractor,
  FaSeedling,
  FaTasks,
} from "react-icons/fa";
import { GiSprout, GiFertilizerBag } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
// import YardIcon from "@mui/icons-material/Yard";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import AddFertilizers from "../components/AddFertilizers";
import AddDiseases from "../components/AddDiseases";
import AddPesticides from "../components/AddPesticides";
import DashSoils from "../components/DashSoils";
import DashFertilizers from "../components/DashFertilizers";
import DashDiseases from "../components/DashDiseases";
import DashPesticides from "../components/DashPesticides";
import MyActivities from "../components/MyActivities";
import AddTractor from "../components/tractor/AddTractor";
import NurseryCropList from "../components/Nursery/NurseryCropList";
import AddNurseryForm from "../components/Nursery/AddNurseryForm";
import ManageTractors from "../components/tractor/ManageTractors";
import DashTotalTractors from "../components/tractor/DashTotalTractors";
import DashTractor from "../components/DashTractor";
import DashTotalNursery from "../components/Nursery/DashTotalNurseries";
import DashNursery from "../components/Nursery/DashNursery";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dash"); // Default tab to 'dash'
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || "dash"; // Default to 'dash' if no tab is found
    setTab(selectedTab);
    // getManuresByUser();
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-col min-h-screen content-center md:flex-row bg-white ">
      <div className={`${sidebar ? "md:w-80" : ""} bg-white`}>
        {/* Sidebar */}
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 70 }}
        >
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
                className="flex float-end  rounded-2xl p-2 text-green-700 font-bold cursor-pointer hover:bg-green-500 hover:text-white  "
              >
                X
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/dashboard?tab=dash"
                    className="flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 15 15"
                      height="1em"
                      width="1em"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 001.04 2.15C1 2.324 1 2.52 1 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 002.15 6.96C2.324 7 2.52 7 2.75 7H5.25c.229 0 .426 0 .6-.041A1.5 1.5 0 006.96 5.85C7 5.676 7 5.48 7 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 005.85 1.04C5.676 1 5.48 1 5.25 1H2.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 01-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 2.15C8 2.324 8 2.52 8 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 6.96C9.324 7 9.52 7 9.75 7H12.25c.229 0 .426 0 .6-.041A1.5 1.5 0 0013.96 5.85C14 5.676 14 5.48 14 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 1.04C12.676 1 12.48 1 12.25 1H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM2.75 8H5.25c.229 0 .426 0 .6.041A1.5 1.5 0 016.96 9.15C7 9.324 7 9.52 7 9.75V12.25c0 .229 0 .426-.041.6A1.5 1.5 0 015.85 13.96C5.676 14 5.48 14 5.25 14H2.75c-.229 0-.426 0-.6-.041A1.5 1.5 0 011.04 12.85C1 12.676 1 12.48 1 12.25V9.75c0-.229 0-.426.041-.6A1.5 1.5 0 012.15 8.04C2.324 8 2.52 8 2.75 8zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 00-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 00.37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 00.37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 00-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 9.15C8 9.324 8 9.52 8 9.75V12.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 13.96c.174.041.371.041.6.041H12.25c.229 0 .426 0 .6-.041a1.5 1.5 0 001.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 8.04C12.676 8 12.48 8 12.25 8H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 01-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                <hr className="p-1 " />
                <li>
                  <Link
                    to="/dashboard?tab=profile"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "croplist" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <FaUser className="h-5 w-5 text-[#3b5a26] transition duration-75 dark:text-[#3b5a26] group-hover:text-green-900 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Profile
                    </span>
                    {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-300">
                      Pro
                    </span> */}
                  </Link>
                </li>
                <hr />
                <li>
                  <Link
                    to="/dashboard?tab=myactivities"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "croplist" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <FaTasks className="h-5 w-5 text-[#3b5a26] transition duration-75 dark:text-[#3b5a26] group-hover:text-green-900 dark:group-hover:text-white " />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      My Activities
                    </span>
                  </Link>
                </li>
                <hr />
                {currentUser.isAdmin && (
                  <div className="flex flex-col">
                    <p className="p-3 font-bold">Agri Help (Admins Only)</p>
                    <li>
                      <Link
                        to="/dashboard?tab=addcrops"
                        className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                          tab === "diseases"
                            ? "bg-green-100 dark:bg-green-700"
                            : ""
                        } hover:bg-green-100 dark:hover:bg-green-700 group`}
                      >
                        <FaSeedling className="h-5 w-5  text-green-700 transition duration-75 dark:text-[#d9534f] group-hover:text-green-900 dark:group-hover:text-white " />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Add Crop
                        </span>
                      </Link>
                    </li>{" "}
                    <li>
                      <Link
                        to="/dashboard?tab=addfertilizers"
                        className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                          tab === "diseases"
                            ? "bg-green-100 dark:bg-green-700"
                            : ""
                        } hover:bg-green-100 dark:hover:bg-green-700 group`}
                      >
                        <GiFertilizerBag className="h-5 w-5  text-green-700 transition duration-75 dark:text-[#d9534f] group-hover:text-green-900 dark:group-hover:text-white " />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Add Fertilizer
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard?tab=adddiseases"
                        className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                          tab === "diseases"
                            ? "bg-green-100 dark:bg-green-700"
                            : ""
                        } hover:bg-green-100 dark:hover:bg-green-700 group`}
                      >
                        <FaHeartbeat className="h-5 w-5  text-[#d9534f] transition duration-75 dark:text-[#d9534f] group-hover:text-green-900 dark:group-hover:text-white " />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Add Disease
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard?tab=addpesticides"
                        className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                          tab === "pesticides"
                            ? "bg-green-100 dark:bg-green-700"
                            : ""
                        } hover:bg-green-100 dark:hover:bg-green-700 group`}
                      >
                        <FaSyringe className="h-5 w-5  text-[#007bff] transition duration-75 dark:text-[#007bff] group-hover:text-green-900 dark:group-hover:text-white " />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Add Pesticide
                        </span>
                      </Link>
                    </li>
                    <br />
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="p-3 font-bold">Agri Services</p>
                  <li>
                    <Link
                      to="/dashboard?tab=addmanure"
                      className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                        tab === "fertilist"
                          ? "bg-green-100 dark:bg-green-700"
                          : ""
                      } hover:bg-green-100 dark:hover:bg-green-700 group`}
                    >
                      <GiSprout className="h-5 w-5 text-[#7B3F00] transition duration-75 dark:text-[#4c8f2e] group-hover:text-[#7B3F00] dark:group-hover:text-white " />

                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Add Manure
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard?tab=addtractor"
                      className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                        tab === "diseases"
                          ? "bg-green-100 dark:bg-green-700"
                          : ""
                      } hover:bg-green-100 dark:hover:bg-green-700 group`}
                    >
                      <FaTractor className="h-5 w-5  text-[#d9534f] transition duration-75 dark:text-[#d9534f] group-hover:text-[#d9534f] dark:group-hover:text-white " />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Add Tractor
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard?tab=addnurseries"
                      className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                        tab === "diseases"
                          ? "bg-green-100 dark:bg-green-700"
                          : ""
                      } hover:bg-green-100 dark:hover:bg-green-700 group`}
                    >
                      <YardOutlinedIcon />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Add Nursery
                      </span>
                    </Link>
                  </li>
                </div>{" "}
                <hr className="p-1 " />
                <li onClick={handleSignout}>
                  <div
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white cursor-pointer ${
                      tab === "diseases" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                    onClick={handleSignout}
                  >
                    <CiLogout className="h-5 w-5  text-[#d9534f] transition duration-75 dark:text-[#d9534f] group-hover:text-red-600 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Log Out
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </motion.div>
      </div>

      <div className="flex-1 p-4 ">
        {/* Render the corresponding tab component */}
        <motion.div
          className="transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tab === "profile" && <DashProfile />}
          {tab === "addmanure" && <AddManure />}
          {tab === "addtractor" && <AddTractor />}
          {tab === "addnursery" && <AddNurseryForm />}
          {tab === "managetractor" && <ManageTractors />}
          {tab === "alltractor" && <DashTotalTractors />}
          {tab === "yourtractors" && <DashTractor />}

          {tab === "tab=nurseries/croplist" && <NurseryCropList />}
          {tab === "nurseries" && <DashTotalNursery />}
          {tab === "addnurseries" && <AddNurseryForm />}

          {tab === "manuresbyuser" && <DashManure />}
          {tab === "nurseriesbyuser" && <DashNursery />}

          {tab === "totalmanures" && <DashTotalManure />}
          {tab === "totalcrops" && <DashCrops />}
          {tab === "totalsoils" && <DashSoils />}
          {tab === "totalfertilizers" && <DashFertilizers />}
          {tab === "totaldiseases" && <DashDiseases />}
          {tab === "totalpesticides" && <DashPesticides />}
          {tab === "myactivities" && <MyActivities />}

          {tab === "addcrops" && <AddCrop />}
          {tab === "addfertilizers" && <AddFertilizers />}
          {tab === "adddiseases" && <AddDiseases />}
          {tab === "addpesticides" && <AddPesticides />}
          {tab === "comments" && <DashComments />}
          {tab === "dash" && <DashboardComp />}
        </motion.div>
      </div>
    </div>
  );
}
