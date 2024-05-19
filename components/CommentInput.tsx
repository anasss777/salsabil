"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { svgComment, svgSend, svgSendEn } from "./svgPaths";
import { AddComment } from "@/utils/post";

type Props = {
  postId: string;
};

const CommentInput = ({ postId }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("postPage");
  const [commentContent, setCommentContent] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [commenterNameError, setCommenterNameError] = useState("");
  const [commentContentError, setCommentContentError] = useState("");

  const validateInputs = () => {
    if (!commenterName) {
      setCommenterNameError(t("nameError"));
      return;
    }
    if (!commentContent) {
      setCommentContentError(t("contentError"));
      return;
    }
    AddComment(postId, commenterName, commentContent);
  };

  return (
    <div
      className={`w-full rounded-md p-2 flex flex-col items-center justify-between gap-10 mx-auto h-fit ${
        isArabic && "rtl"
      }`}
    >
      <div
        className={`flex flex-col justify-center items-center text-secondary mb-3`}
      >
        <span>{svgComment}</span>
        <p className={`font-bold text-2xl`}>{t("comments")}</p>
      </div>

      {/* Comment Input */}
      <div className="flex flex-col justify-between items-end gap-5 w-full">
        <input
          type="text"
          placeholder={t("commenterName")}
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          className={`w-full rounded-md shadow-Card outline-none py-3 px-3 text-gray-400 dark:text-gray-200`}
        />
        <textarea
          rows={4}
          cols={50}
          placeholder={t("commentContent")}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full rounded-md shadow-Card outline-none py-3 px-3 text-gray-400 dark:text-gray-200 resize-none "
        ></textarea>

        {/* Add comment button */}
        <button onClick={validateInputs} className={`btn bg-primary shadow-lg`}>
          <span className={`flex justify-center items-center h-fit w-fit p-1`}>
            {isArabic ? svgSend : svgSendEn}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
