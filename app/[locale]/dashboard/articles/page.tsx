import ArticlesList from "@/components/Dashboard/ArticlesList";
import React from "react";

const Articles = () => {
  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      <ArticlesList />
    </div>
  );
};

export default Articles;
