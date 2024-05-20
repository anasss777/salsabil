"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import PostCard from "@/components/PostCard";
import { svgPurpleUnderline, svgSearch } from "@/components/svgPaths";
import { searchPosts } from "@/utils/searchPost";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const t = useTranslations("postPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const rtl = isArabic ? "rtl" : "ltr";
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
    <div
      className={`flex flex-col gap-20 justify-center items-center w-full min-h-[70vh] py-20 px-10 lg:px-32 ${rtl}`}
    >
      <div className={`flex flex-col justify-center items-center gap-5 w-full`}>
        {/* Title */}
        <div className={`flex flex-col gap-1`}>
          <p
            className={`text-4xl lg:text-5xl font-bold text-secondary font-marhey text-center`}
          >
            {t("title")}
          </p>
          <span>{svgPurpleUnderline}</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-row items-center justify-center w-full">
          <input
            type="text"
            onChange={(event) =>
              setsearchedPosts(searchPosts(event.target.value, posts))
            }
            placeholder="إبحث عن مقالة..."
            className={`py-2 px-2 rounded-s-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-gray-50
            shadow-Card2`}
          />
          <button className="bg-primary p-[11.5px] rounded-e-md">
            {svgSearch}
          </button>
        </div>
      </div>

      {/* Posts card */}
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center`}
      >
        {searchedPosts
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .map((post, index) => (
            <div key={index}>
              <PostCard
                category={post.category}
                title={post.postTitle}
                imageSrc={post.postImage}
                pageLink={`/${post.postId}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
