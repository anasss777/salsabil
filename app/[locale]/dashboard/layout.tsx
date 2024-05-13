import "@/styles/globals.css";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { Cairo } from "next/font/google";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Head from "../(site)/Head";
import { Providers } from "../(site)/Provider";
import Sidebar from "@/components/Dashboard/Sidebar";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900", "1000"],
});

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({ children, params }: RootLayoutProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const locales = ["en", "ar"];
  const messages = useMessages();

  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale}>
      <Head />

      <body
        className={`${
          cairo.className
        } dark:bg-[#201120] bg-gray-200 flex flex-row min-h-screen ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Sidebar />
            <div className="flex-grow">{children}</div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
