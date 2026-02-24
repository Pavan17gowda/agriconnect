import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
// import imageURL from "../assets/bgimg.jpg";
import imageURL from "../assets/bg2img.webp";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [email, setEmail] = useState(user?.email);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject: "Subscribed",
          text: "Subscription successful",
          html: "<b>Title</b>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, aspernatur.",
        }),
      });
      if (response.ok) {
        alert("Thank you for subscribing!");
        setEmail("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className="relative min-w-full flex items-center justify-center min-h-screen bg-white text-green-800 dark:bg-black dark:text-green-100">
      {/* Background Animation */}
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 dark:from-black dark:to-black"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div> */}

      <div className="relative z-10 min-w-full flex flex-col items-center justify-center text-center">
        <div className="relative min-w-full flex items-center justify-center min-h-screen bg-white text-green-800 dark:bg-black dark:text-green-100">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageURL})`,
            }}
          >
            {/* Overlay to Control Opacity */}
            <div className="absolute inset-0 bg-black opacity-25"></div>
          </div>

          <div className="relative z-10 min-w-full flex flex-col items-center justify-center text-center">
            {/* Header Animation */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text opacity-100 bg-gradient-to-r from-[#e75151] to-[#dda15e] mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="opacity-100">
                Welcome to <br />
                Farmer's Assistant
              </span>
            </motion.h1>

            {/* Paragraph Animation */}
            <motion.p
              className="text-lg md:text-xl mb-8 max-w-md mx-auto text-yellow-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              Farmer's Assistant:
              <br />
              <span className="inline-block">
                <Typewriter
                  words={[
                    "Empowering Farmers, Growing Futures",
                    "Smart Solutions for Agriculture",
                    "Innovative Farming, Better Yields",
                    "Sustainable Farming Made Simple",
                    "Your Digital Farming Partner",
                  ]}
                  loop={0}
                  cursor={true}
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={1000}
                />
              </span>
            </motion.p>

            {/* Button Animation */}
            <motion.div
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              <Link to="/sign-up">Get Started</Link>
            </motion.div>
          </div>
        </div>

        <main className="w-full">
          <section
            id="features"
            className="py-12 md:py-24 lg:py-32 flex justify-center"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Key Features
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-center">
                {[
                  {
                    title: "Crop Management",
                    description:
                      "Select proper crop , fertilizer and get to know the diseases and pesticides accordingly.",
                    color: "#e9c46a",
                    iconPath:
                      "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
                  },
                  {
                    title: "Agricultural Transport Management",
                    description:
                      "Get the facility of tractors for ploughing and vehicles for load transportations.",
                    color: "#dda15e",
                    iconPath:
                      "M8 6L12 2l4 4M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22m16-4l-5-5",
                  },
                  {
                    title: "One - One Manure and Tractor Management",
                    description:
                      "Providers will provide the maured ot tractors and the farmers can use them",
                    color: "#e76f51",
                    iconPath:
                      "M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5zM18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center bg-green-100 dark:bg-green-800 bg-glass p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`mb-4 rounded-full p-2`}
                      style={{ backgroundColor: feature.color }}
                    >
                      <svg
                        className="h-6 w-6 text-[#283618]"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d={feature.iconPath} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-[#606c38] dark:text-[#fefae0] mt-2">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="py-12 md:py-24 lg:py-32 flex justify-center"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Stay Updated
                  </h2>
                  <p className="text-lg text-[#606c38] dark:text-[#fefae0]">
                    Subscribe to get the latest updates.
                  </p>
                </div>

                <form
                  className="w-full max-w-md flex items-center justify-center"
                  onSubmit={handleEmailSubmit}
                >
                  <input
                    className="w-full py-2 px-4 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e76f51] dark:bg-[#606c38] dark:text-white"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="inline-block px-6 py-2 bg-[#e76f51] text-[#fefae0] rounded-r-md shadow-lg hover:bg-[#dda15e] transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
