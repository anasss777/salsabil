"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Menu from "./Menu";
import ThemeSwitcher from "../ThemeSwitcher";

const NavbarElements = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        id="navbarToggler"
        onClick={toggleMenu}
        className={`absolute block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${
          locale === "ar" ? "left-2" : "right-2"
        }`}
      >
        <span
          className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
            isMenuOpen && "top-[7px] rotate-45"
          }`}
        ></span>
        <span
          className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
            isMenuOpen && "opacity-0"
          }`}
        ></span>
        <span
          className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
            isMenuOpen && "top-[-8px] -rotate-45"
          }`}
        ></span>
      </button>
      <nav
        id="navbarCollapse"
        className={`absolute top-16 ${
          locale === "ar" ? "left-1 lg:pr-4" : "right-1 lg:pl-4"
        } ${
          isMenuOpen ? "block" : "hidden"
        } w-full max-w-[250px] rounded-lg bg-white shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-1
        lg:shadow-none xl:px-6`}
      >
        <ul
          onClick={() => setMenuOpen(false)}
          className={`block lg:flex flex-row gap-5 border rounded-lg border-primary bg-gray-100 dark:bg-[#291929] lg:bg-transparent
          lg:border-none lg:dark:bg-transparent ${
            locale === "ar" ? "text-right pr-3" : "text-left pl-3"
          }`}
        >
          <div
            className={`lg:hidden p-[6px] w-full h-fit rounded-t-lg mx-auto flex justify-center bg-gradient-to-l from-transparent
            via-primary/50 to-transparent`}
          >
            <ThemeSwitcher />
          </div>
          <Menu text={t("about")} href="/about" />
          <Menu text={t("category1")} href="/category1" />
          <Menu text={t("category2")} href="/category2" />
          <Menu text={t("category3")} href="/category3" />
          <Menu text={t("contact")} href="/contact" />
        </ul>
      </nav>
    </div>
  );
};

export default NavbarElements;
