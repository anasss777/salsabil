"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import PostCard from "@/components/PostCard";
import { svgPurpleUnderline } from "@/components/svgPaths";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const t = useTranslations("postPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const rtl = isArabic ? "rtl" : "ltr";

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
    <div
      className={`flex flex-col gap-20 justify-center items-center w-full min-h-[70vh] py-20 px-10 lg:px-32 ${rtl}`}
    >
      {/* Title */}
      <div className={`flex flex-col gap-1`}>
        <p
          className={`text-4xl lg:text-5xl font-bold text-secondary font-marhey text-center`}
        >
          {t("title")}
        </p>
        <span>{svgPurpleUnderline}</span>
      </div>

      {/* Posts card */}
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center`}
      >
        {posts.map((post, index) => (
          <div key={index}>
            <PostCard
              category={post.category}
              title={post.postTitle}
              imageSrc={post.postImage}
              pageLink={`/${post.postId}`}
            />
          </div>
        ))}
        {posts.map((post, index) => (
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
