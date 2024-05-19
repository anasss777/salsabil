import { Timestamp } from "firebase/firestore";
import { Comment } from "./comment";

export type Post = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  postImage: string;
  content: string;
  comments: Comment[];
  category: string;
};
