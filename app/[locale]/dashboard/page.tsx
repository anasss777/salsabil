"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { addPost } from "@/utils/post";
import { useRouter } from "next/navigation";
import { svgDot, svgLoading } from "@/components/svgPaths";

const Dashboard = () => {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  let toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ];
  const moduleOptions = {
    toolbar: toolbarOptions,
  };

  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      {/* Post title */}
      <div className={`flex flex-col justify-center items-center`}>
        <h2 className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}>
          {t("postTitle")}
        </h2>
        <input
          value={postTitle}
          placeholder={t("postTitle")}
          onChange={(e) => setPostTitle(e.target.value)}
          className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
        />
      </div>

      {/* Post contnet */}
      <ReactQuill
        modules={moduleOptions}
        theme="snow"
        value={content}
        onChange={setContent}
        className={`bg-white/40 w-full h-96 pb-[44px]`}
      />

      <div className={`flex flex-col`}>
        <p
          className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4`}
        >
          {postTitle}
        </p>

        <div className="flex flex-row gap-2 mx-auto mb-12">
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
          <span className={`mt-4`}>{svgDot}</span>
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
        </div>
        <div className="quill-content">{parse(content)}</div>
      </div>

      <button
        className={`btn px-4 mx-auto bg-primary mb-20`}
        onClick={() => {
          addPost({
            postTitle,
            content,
            category: "test",
          });
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            // router.push(`/${locale}/posts`);
          }, 2000);
        }}
      >
        {isLoading ? (
          <span className={`flex flex-row items-center gap-1`}>
            {t("loading")} {svgLoading}
          </span>
        ) : (
          <span className={`flex flex-row items-center gap-1`}>
            {t("submit")}
          </span>
        )}
      </button>
    </div>
  );
};

export default Dashboard;
