"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import ArticleRow from "./ArticleRow";
import { svgSearch } from "../svgPaths";
import { searchPosts } from "@/utils/searchPost";

const ArticlesList = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("articles");
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchedPosts, setsearchedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const newPosts: Post[] = []; // Create a new array to hold updated posts
        snapshot?.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as Post);
        });

        setPosts(newPosts);
        setsearchedPosts(newPosts);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={`w-full ${isArabic && "rtl"}`}>
      {/* Search Bar */}
      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="text"
          onChange={(event) =>
            setsearchedPosts(searchPosts(event.target.value, posts))
          }
          placeholder="إبحث عن مقالة..."
          className={`py-2 px-2 rounded-s-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-gray-50
            shadow-Card2 my-10`}
        />
        <button className="bg-primary p-[11.5px] rounded-e-md">
          {svgSearch}
        </button>
      </div>

      {/* Posts List */}
      <table className={`w-full`}>
        <tbody>
          {/* Heading */}
          <tr
            className={`bg-primary shadow-Card2 py-2 px-5 rounded-full text-white`}
          >
            <th
              className={`p-2 ${
                isArabic ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {t("id")}
            </th>
            <th className={`p-2`}>{t("postTitle")}</th>
            <th className={`p-2`}>{t("category")}</th>
            <th className={`p-2`}>{t("date")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("manage")}
            </th>
          </tr>

          {/* Posts */}
          {searchedPosts
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((post, index) => (
              <ArticleRow key={index} post={post} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesList;
