"use client";

import { Post } from "@/types/post";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { searchPosts } from "@/utils/searchPost";
import PostCard from "@/components/PostCard";
import { useLocale } from "next-intl";

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
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

        if (searchQuery) {
          setPosts(searchPosts(searchQuery, newPosts));
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [searchQuery]);

  return (
    <div
      className={`flex flex-col gap-20 justify-center items-center w-full min-h-[70vh] py-20 px-10 lg:px-32 ${rtl}`}
    >
      <h1
        className={`flex mx-auto text-2xl md:text-3xl lg:text-4xl text-primary font-bold`}
      >
        نتائج البحث عن:{" "}
        <span className={`text-secondary`}>&nbsp;{searchQuery || ""}</span>
      </h1>

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
      </div>
    </div>
  );
};

export default Page;
