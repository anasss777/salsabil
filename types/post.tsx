import { Timestamp } from "firebase/firestore";

export type Post = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  content: string;
  comments: Comment[];
  category: string;
};
