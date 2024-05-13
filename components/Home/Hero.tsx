"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import parse from "html-react-parser";
import { svgDot } from "../svgPaths";
import Image from "next/image";

const Hero = () => {
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
    <div className={`rtl px-10 lg:px-32 py-20`}>
      {posts.map((post, index) => (
        <div key={index} className={`flex flex-col`}>
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
            src="/images/testing.png"
            alt="testing"
            height={1000}
            width={1000}
            className={`object-scale-down h-96 w-full`}
          />

          <div className="quill-content">{parse(post.content)}</div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
