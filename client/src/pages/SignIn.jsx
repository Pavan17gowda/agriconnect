import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await res.json();

      // setErrorMessage(response.message);

      // if (response.success === false) {
      //     dispatch(signInFailure(response.message))
      // }
      //setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(response));
        // localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        dispatch(
          signInFailure(
            response.message || "An error occurred. Please try again."
          )
        );
      }
    } catch (err) {
      // setErrorMessage(err.message);
      // setLoading(false);
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-3">
        <div className="max-w-4xl w-full flex flex-col  mb-20 md:flex-row gap-5">
          {/* Left */}
          <div className="flex-1 shadow-lg rounded-xl p-5 bg-green-100 dark:bg-green-50 flex flex-col items-center justify-center">
            <Link
              to="/"
              className="font-bold dark:text-white text-4xl text-center"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-lg text-white shadow-md">
                Farmer's
              </span>
              Assistant
            </Link>
            <p className="text-sm mt-5 text-center">
              Empowering Farmers, Growing Futures
            </p>
          </div>
          {/* Right */}
          <div className="flex-1 shadow-lg rounded-xl p-5 bg-green-100 dark:bg-green-800 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-green-50 dark:hover:bg-green-700 duration-700">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* <div>
                                <Label htmlFor='username' value='Your username' />
                                <TextInput
                                    type='text'
                                    placeholder='johnDoe'
                                    id='username'
                                    onChange={handleChange}
                                />
                            </div> */}
              <div>
                <Label htmlFor="email" value="Your email" />
                <TextInput
                  type="email"
                  placeholder="john@doe.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password" value="Your password" />
                <TextInput
                  type="password"
                  placeholder="**********"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="text-center" size="lg" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Don't Have an Account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </div>
            {errorMessage && (
              <Alert
                className="mt-5"
                color={
                  errorMessage.includes("successful") ? "success" : "failure"
                }
              >
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
