import { Post } from "@/types/post";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit, svgLink } from "../svgPaths";
import { deletePost } from "@/utils/post";
import Swal from "sweetalert2";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  post: Post;
};

const ArticleRow = ({ post }: Props) => {
  const locale = useLocale();
  const t = useTranslations("articles");

  const handleDeletePost = () => {
    Swal.fire({
      title: t("sure"),
      text: t("deletePostWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(post);
        Swal.fire({
          text: t("postDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>{post.postId}</td>
      <td className={`text-gray-400 text-center py-3`}>{post.postTitle}</td>
      <td className={`text-gray-400 text-center py-3`}>
        {post.createdAt.toDate().toLocaleDateString()}
      </td>
      <td className={`flex flex-row justify-center gap-1 text-gray-400 py-3`}>
        <Link
          href={`/dashboard/articles/edit/${post.postId}`}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgEdit}
        </Link>

        <button
          onClick={handleDeletePost}
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgDelete}
        </button>

        <Link
          href={`/post/${post.postId}`}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgLink}
        </Link>
      </td>
    </tr>
  );
};

export default ArticleRow;
