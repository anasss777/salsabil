import { Timestamp } from "firebase/firestore";
import { Profile } from "./profile";

export type Comment = {
  id: string;
  commentId: string;
  createdAt: Timestamp;
  content: string;
  commentorName: string;
  reports?: string[];
};
