import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { GoPlus } from "react-icons/go";
import { LuMoon, LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

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
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar className="sticky top-0 z-50 border-b-2 bg-green-50 bg-opacity-70 backdrop-blur-md shadow-lg flex justify-between items-center">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-green-800 dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-lg text-white shadow-md">
          Farmer's
        </span>
        Assistant
      </Link>

      <div className="flex gap-5 items-center md:order-3">
        {currentUser ? (
          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <div className="relative cursor-pointer">
              <NotificationBell />
            </div>

            {/* User Dropdown */}
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex gap-3 justify-center items-center">
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                  <h1>{currentUser.username}</h1>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>

              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <Link to="/sign-in">
            <Button
              gradientDuoTone="greenToBlue"
              outline
              className="shadow-md hover:shadow-lg hover:bg-gradient-to-r from-green-500 to-blue-500 hover:text-white transition-all duration-300 dark:border-gray-600 dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-green-600 dark:hover:to-blue-600"
            >
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/"
          active={path === "/"}
          className="dark:text-white"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/about"
          active={path === "/about"}
          className="dark:text-white"
        >
          About
        </Navbar.Link>

        <Navbar.Link
          as={Link}
          to="/agrihelp"
          active={path === "/agrihelp"}
          className="dark:text-white"
        >
          AgriHelp
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/services"
          active={path === "/services"}
          className="dark:text-white"
        >
          AgriServices
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/dashboard"
          active={path === "/dashboard"}
          className="dark:text-white"
        >
          Dashboard
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
