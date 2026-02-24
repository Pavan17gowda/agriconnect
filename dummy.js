import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
// import { HiUser } from "react-icons/hi";
// import { FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { IoDocumentText } from "react-icons/io5";
import { HiAnnotation, HiChartPie } from "react-icons/hi";
import { FaUser, FaSeedling } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GiSproutDisc } from "react-icons/gi";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setTab(urlParams.get("tab"));
  }, [location.search]);
  const dispatch = useDispatch();
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
    <>
      <Sidebar className="min-h-full w-full  ">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            {/* {currentUser && currentUser.isAdmin && ( */}
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            {/* )} */}
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={FaUser}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=addmanure">
              <Sidebar.Item
                active={tab === "manures"}
                icon={GiSproutDisc}
                //   label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor="red"
                as="div"
              >
                Add Manure
              </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
              <>
                <Link to="/dashboard?tab=addcrops">
                  <Sidebar.Item
                    active={tab === "addcrops"}
                    icon={FaSeedling}
                    as="div"
                  >
                    Add Crops
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=users">
                  <Sidebar.Item
                    active={tab === "users"}
                    icon={FaUsers}
                    as="div"
                  >
                    Users
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=comments">
                  <Sidebar.Item
                    active={tab === "comments"}
                    icon={HiAnnotation}
                    as="div"
                  >
                    Comments
                  </Sidebar.Item>
                </Link>
              </>
            )}
            <Sidebar.Item
              className="cursor-pointer"
              icon={CiLogout}
              onClick={handleSignout}
            >
              Sign out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
