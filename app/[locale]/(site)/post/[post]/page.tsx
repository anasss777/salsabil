"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import parse from "html-react-parser";
import Image from "next/image";
import { svgDot } from "@/components/svgPaths";
import Loading from "@/components/Loading";
import { useLocale } from "next-intl";

type Props = {
  params: { post: string };
};

const Page = ({ params }: Props) => {
  const id = params.post;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const newPosts: Post[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as Post);
        });

        // Set a post based on postId
        const postId = id; // Replace with your postId
        const post = newPosts.find((post) => post.postId === postId);
        if (post) {
          setPost(post);
          setLoading(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
          isArabic && "rtl"
        }`}
      >
        <Loading />
      </div>
    );
  }

  if (!post) {
    return <p>No post found.</p>;
  }

  return (
    <div className={`rtl px-10 lg:px-32 py-20`}>
      <div className={`flex flex-col`}>
        <p
          className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4`}
        >
          {post.postTitle}
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

        <Image
          src={post.postImage ? post.postImage : "/images/testing.png"}
          alt="testing"
          height={1000}
          width={1000}
          className={`object-cover h-96 w-full rounded-xl border border-primary shadow-lg mb-8`}
        />

        <div className="quill-content">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default Page;
