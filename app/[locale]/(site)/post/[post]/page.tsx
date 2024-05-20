"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { Post } from "@/types/post";
import parse from "html-react-parser";
import Image from "next/image";
import { svgDot, svgHome, svgMind } from "@/components/svgPaths";
import Loading from "@/components/Loading";
import { useLocale } from "next-intl";
import CommentInput from "@/components/CommentInput";
import CommentCard from "@/components/CommentCard";
import { Comment } from "@/types/comment";
import Breadcrumbs from "@/components/BreadCrumbs";

type Props = {
  params: { post: string };
};

const Page = ({ params }: Props) => {
  const id = params.post;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>();
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

  useEffect(() => {
    const fetchComments = async () => {
      const commentsIds = post?.comments?.map((comment) => comment.id);
      const commentsRefs = commentsIds?.map((commentId) =>
        firebase.firestore().doc(`comments/${commentId}`)
      );

      if (commentsRefs) {
        const commentSnaps = await Promise.all(
          commentsRefs.map(async (ref) => await ref.get())
        );

        const commentsData: Comment[] = commentSnaps?.map(
          (commentSnap) => ({ ...commentSnap.data() } as Comment)
        );

        setComments(commentsData);
      }
    };

    fetchComments();
  }, [post?.comments]);

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
      <div className={`mb-16`}>
        <Breadcrumbs
          categorySvg={svgMind}
          categoryName={post.category}
          categoryLink={""}
          postTitle={post.postTitle}
        />
      </div>

      <div className={`flex flex-col`}>
        {/* Post title */}
        <p
          className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4`}
        >
          {post.postTitle}
        </p>

        {/* Fancy underline */}
        <div className="flex flex-row gap-2 mx-auto mb-12">
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
          <span className={`mt-4`}>{svgDot}</span>
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
        </div>

        {/* Post image */}
        <Image
          src={post.postImage ? post.postImage : "/images/testing.png"}
          alt="testing"
          height={1000}
          width={1000}
          className={`object-cover h-96 w-full rounded-xl border border-primary shadow-lg mb-8`}
        />

        {/* Post content */}
        <div className="quill-content">{parse(post.content)}</div>
      </div>

      {/* Add new comment */}
      <CommentInput postId={post.postId} />

      {/* Post Comments */}
      {comments && (
        <div className={`w-full mt-10`}>
          {comments.map((comment, index) => (
            <div key={index}>
              <CommentCard comment={comment} />
              {post.comments.length - 1 !== index && (
                <div
                  className={`border-t border-t-secondary/60 my-5 w-full`}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
