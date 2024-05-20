"use client";

import React, { useState } from "react";
import { svgSearch } from "../svgPaths";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const Hero = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  // Search parameters
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  // Search function
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
    setSearchQuery("");
  };

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
        <form
          onSubmit={handleSearch}
          className="flex flex-row items-center justify-center w-full"
        >
          <input
            value={searchQuery || ""}
            type="text"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="إبحث عن مقالة..."
            className={`py-2 px-2 rounded-e-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-gray-50
            shadow-Card2 ${isArabic && "rtl"}`}
          />
          <button className="bg-primary p-[11.5px] rounded-e-md">
            {svgSearch}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
