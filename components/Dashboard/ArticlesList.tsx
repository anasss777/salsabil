"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import ArticleRow from "./ArticleRow";

const ArticlesList = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("articles");
  const [posts, setPosts] = useState<Post[]>([]);

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
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={`w-full`}>
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
          {posts
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
