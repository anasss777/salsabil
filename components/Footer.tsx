import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });
import React from "react";

const Footer = () => {
  const todayYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-6 bg-primary pt-4 px-3 mt-10 relative bottom-0 ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div className={`flex flex-row gap-5 justify-center items-center`}>
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1`}
        >
          <p
            className={`text-purple-200 text-xl font-marhey bg-[#6b24b2] rounded-full px-2 border border-purple-400`}
          >
            سلسبيل
          </p>
        </Link>
      </div>

      <div className={`flex flex-col gap-3`}>
        <div>
          <p className="flex justify-center font-bold text-purple-900">
            {t("email")}
          </p>
          <p className="flex justify-center text-purple-100 text-sm">
            salsabil@salsabil.com
          </p>
        </div>
        <div>
          <p className="flex justify-center font-bold text-purple-900">
            {t("phoneNumber")}
          </p>
          <p className="flex justify-center text-purple-100 text-sm">
            +901234567890
          </p>
        </div>
        <div>
          <p className="flex justify-center font-bold text-purple-900">
            {t("address")}
          </p>
          <p className="flex justify-center text-purple-100 text-sm text-center">
            {t("theAddress")}
          </p>
        </div>
      </div>

      <p
        className={`flex justify-center text-white mx-auto rtl bg-white/20 pb-1 w-full text-sm font-light ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        {t("developedBy")}
        <Link
          href="https://anas-chammam.vercel.app"
          target="_blank"
          locale={locale}
          className={`text-purple-900 font-normal`}
        >
          &nbsp;Anas Chammam&nbsp;
        </Link>
        {todayYear}©
      </p>
    </div>
  );
};

export default Footer;
