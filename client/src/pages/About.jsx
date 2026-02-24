import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const About = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center bg-white text-[#283618] dark:bg-[#283618] dark:text-[#fefae0]`}
    >
      <div className="relative z-10 max-w-7xl mx-auto p-10 text-center">
        {/* Header Animation */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#8bc34a] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
            About Farmer's Assistant
          </h1>
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.div
          className="text-lg md:text-xl mb-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <p className="text-lg leading-relaxed mb-6">
            Welcome to <strong>Farmer's Assistant</strong>, a one-stop solution
            designed to revolutionize modern farming practices. Our platform is
            dedicated to empowering farmers with the tools and resources they
            need to make informed decisions, enhance productivity, and embrace
            smart agricultural techniques.
          </p>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            At Farmer's Assistant, we aim to bridge the gap between technology
            and agriculture, offering farmers real-time support to address their
            daily challenges and foster sustainable growth in the agricultural
            sector.
          </p>
          {/* Key Features */}
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🌱</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Crop Advisory</h3>
                <p>
                  Get tailored crop recommendations based on soil type and
                  environmental conditions.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">💧</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Fertilizer Guidance
                </h3>
                <p>
                  Discover the best fertilizers for your crops to ensure healthy
                  growth.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🛠️</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Tractor Management
                </h3>
                <p>
                  Seamlessly manage tractor availability for plowing and other
                  tasks.
                </p>
              </div>
            </div>

            {/* <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🌤️</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Weather Updates</h3>
                <p>
                  Stay updated with real-time weather forecasts to plan your
                  farming activities.
                </p>
              </div>
            </div> */}
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🌾</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Nursery Assistance
                </h3>
                <p>
                  Explore plant nurseries to choose the best plants for your
                  farm.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Farmer's Assistant? */}
          {/* Why Choose Farmer's Assistant? */}
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Why Choose Farmer's Assistant?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🎨</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  User-Friendly Interface
                </h3>
                <p>Intuitive design makes it easy for anyone to use.</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🛡️</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Comprehensive Solutions
                </h3>
                <p>
                  From crop selection to marketing, we've got it all covered.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-[#424242] p-4 rounded-lg shadow-lg">
              <div className="text-3xl text-green-600 mr-4">🌍</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Sustainable Agriculture
                </h3>
                <p>Promote eco-friendly practices and maximize productivity.</p>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed">
            Join us in transforming agriculture with innovation and technology.
            Let’s grow together! 🌾
          </p>
        </motion.div>

        {/* Button Animation */}
        <motion.a
          href="mailto:naveenku759@gmail.com"
          className="inline-block px-8 py-3 bg-[#4caf50] text-white rounded-full shadow-lg hover:bg-[#8bc34a] transition duration-300 transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          Contact Us
        </motion.a>
      </div>
    </div>
  );
};

export default About;
