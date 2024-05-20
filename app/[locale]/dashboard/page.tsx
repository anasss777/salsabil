"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { addPost } from "@/utils/post";
import { useRouter } from "next/navigation";
import {
  svgAddImage,
  svgDefaultImage,
  svgDot,
  svgLoading,
} from "@/components/svgPaths";
import Image from "next/image";

const Dashboard = () => {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [postImage, setPostImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
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

      <button className="flex flex-col items-center justify-center cursor-default">
        <label htmlFor={`imageInput`} className="cursor-pointer">
          <span
            className={`flex bg-primary/30 dark:bg-primary/50 h-fit w-fit p-1 rounded-full border border-primary shadow-md`}
          >
            {svgAddImage}
          </span>
        </label>
        <input
          type="file"
          id={`imageInput`}
          multiple
          accept="image/*"
          className="absolute -top-10"
          onChange={(e) => handleImageChange(e)}
        />
      </button>

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

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Post image"
            height={1000}
            width={1000}
            className={`object-cover h-96 w-full rounded-xl border border-primary shadow-lg mb-8 flex justify-center`}
          />
        ) : (
          <span className={`flex h-fit w-fit mx-auto mb-8`}>
            {svgDefaultImage}
          </span>
        )}

        <div className="quill-content">{parse(content)}</div>
      </div>

      <button
        className={`btn px-4 mx-auto bg-primary mb-20`}
        onClick={() => {
          addPost({
            postTitle,
            content,
            category: "علم نفس تربوي",
            postImage,
          });
          setIsPosting(true);
          setTimeout(() => {
            setIsPosting(false);
            router.push(`/${locale}/post`);
          }, 5000);
        }}
      >
        {isPosting ? (
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
