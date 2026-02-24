import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import TandC from "./pages/TandC";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AgriHelp from "./pages/AgriHelp";
import Services from "./pages/Services";
import AdminPage from "./pages/AdminPage";
import OtpVerification from "./pages/OtpVerification";
import MyActivities from "./components/MyActivities";

// import { GlobalContext } from "./context/GlobalState";

export default function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/verification" element={<OtpVerification />} />

        <Route
          path="/sign-in"
          element={user ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/agrihelp" element={<AgriHelp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/services" element={<Services />} />
        </Route>
        <Route path="/bookings" element={<MyActivities />} />

        {/* <Route element={<PrivateRoute />}>
        </Route> */}
        {/* <Route path="/croplist" element={<CropList />} />
        <Route path="/fertilist" element={<FertiList />} />
        <Route path="/diseases" element={<Disease />} />
        <Route path="/pesticides" element={<Pesticides />} /> */}

        <Route path="/t&c" element={<TandC />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
