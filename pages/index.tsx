import React from "react";
import Layout from "../components/Layout";
import SliderImg from "../components/IndexComponents/Slide";
import NewProducts from "../components/IndexComponents/NewProducts";
import BestProducts from '../components/IndexComponents/BestProducts';
import MarksSlider from "../components/IndexComponents/MarksSlider";
import InfoStore from "../components/IndexComponents/InfoStore";

const index = () => {
  
  return (
      <div>
      <Layout>
        <SliderImg />
        <div className="mt-8 md:mt-16 sm:p-4 mb-32 w-full">
          <NewProducts/>
          <BestProducts/>
        </div>
        <div className="bg-gray-800 w-screen h-auto">
          <InfoStore/>
        </div>
        <MarksSlider />
      </Layout>
    </div>
  );
};

export default index;
