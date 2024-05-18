import { Timestamp } from "firebase/firestore";

export type Post = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  postImage: string;
  content: string;
  comments: Comment[];
  category: string;
};
