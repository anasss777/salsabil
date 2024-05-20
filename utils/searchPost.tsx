import { Post } from "@/types/post";

export const searchPosts = (searchTerm: string, posts: Post[]): Post[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return posts.filter(
    (post) =>
      post.postTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
      post.category.toLowerCase().includes(lowerCaseSearchTerm)
  );
};
