"use client";

import React from "react";
import { svgSearch } from "../svgPaths";
import { useLocale } from "next-intl";

const Hero = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col justify-center items-center h-[70vh] w-full bg-[url('/images/hero2.jpeg')] bg-custom-postion
      bg-primary/10 bg-blend-overlay`}
    >
      <div className="flex flex-col justify-center mx-auto items-center w-full gap-10">
        <p
          className={`text-white font-bold text-4xl bg-primary/70 rounded-md border-2 border-primary px-5 py-2 mx-6 text-center ${
            isArabic && "rtl"
          }`}
        >
          السلام عليكم ... السلام عليكم ... السلام عليكم
        </p>
        <div className="flex flex-row items-center justify-center w-full">
          <input
            type="text"
            placeholder="إبحث عن مقالة..."
            className={`py-2 px-2 rounded-e-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-gray-50
            shadow-Card2 ${isArabic && "rtl"}`}
          />
          <button className="bg-primary p-3 rounded-e-md">{svgSearch}</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
