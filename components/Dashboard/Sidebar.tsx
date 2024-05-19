"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "../ThemeSwitcher";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Sidebar = () => {
  const t = useTranslations("adminPanel");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const currentPage = usePathname();

  return (
    <div
      className={`md:flex flex-col items-center justify-between w-1/5 h-screen sticky shadow-Card2 py-5 px-2 border-r dark:border-r-gray-600
        hidden ${isArabic && "border-l dark:border-l-gray-600"}`}
    >
      <div className={`flex flex-col gap-1 items-center justify-center w-full`}>
        {/* Logo */}
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1 mb-10`}
        >
          <p
            className={`text-purple-200 text-xl font-marhey bg-[#6b24b2] rounded-full px-2 border border-purple-400`}
          >
            سلسبيل
          </p>
        </Link>

        {/* Dashboard button */}
        <Link
          href="/dashboard"
          locale={locale}
          className={`w-full py-2 text-gray-400 hover:text-gray-200 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
          rounded-xl ${
            currentPage === `/${locale}/dashboard` &&
            "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
          }`}
        >
          {t("addPost")}
        </Link>

        {/* Articles button */}
        <Link
          href="/dashboard/articles"
          locale={locale}
          className={`w-full py-2 text-gray-400 hover:text-gray-200 hover:bg-primary/50 transition-all duration-300 ease-linear px-2
          rounded-xl ${
            currentPage === `/${locale}/dashboard/articles` &&
            "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
          }`}
        >
          {t("articles")}
        </Link>

        {/* Users button */}
        {/* <Link
          href="/dashboard/users"
          locale={locale}
          className={`w-full py-2 text-gray-400 hover:bg-gray-700 transition-all duration-300 ease-linear px-2 rounded-xl
      ${
        currentPage === `/${locale}/dashboard/users` &&
        "bg-primary hover:bg-primary text-white font-semibold transition-all ease-linear"
      }`}
        >
          {t("users")}
        </Link> */}
      </div>

      <div
        className={`p-[6px] w-fit h-fit rounded-full mx-auto flex justify-center bg-primary/50`}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;
