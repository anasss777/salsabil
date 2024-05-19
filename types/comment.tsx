import { Timestamp } from "firebase/firestore";
import { Profile } from "./profile";

export type Comment = {
  id: string;
  createdAt: Timestamp;
  commentContent: string;
  commenterName: string;
  reports?: string[];
};
