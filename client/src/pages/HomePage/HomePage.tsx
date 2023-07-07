import React from "react";
import Hero from "./components/Hero";
import Brand from "./components/Brand";
import Features from "./components/Features";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Hero />
      <Brand />
      <Features />
      <Footer />
    </>
  );
};

export default HomePage;
