import Image from "next/image";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  category: string;
  title: string;
  imageSrc: string;
  pageLink: string;
  isbook?: boolean;
};

const PostCard = ({ category, title, imageSrc, pageLink, isbook }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const rtl = isArabic ? "rtl" : "ltr";

  return (
    <Link
      locale={locale}
      href={`/post/${pageLink}`}
      className={`flex flex-col gap-4 justify-start items-start rounded-3xl  w-full p-3 pb-5 hover:scale-[1.01] transition-all
      duration-300 ease-linear mx-auto dark:shadow-lg h-fit md:h-[350px] lg:h-[300px] bg-gradient-to-b from-primary/60 via-primary/20
      to-transparent dark:bg-gradient-to-b dark:from-primary/50 dark:via-primary/20 dark:to-transparent my-3`}
    >
      <div className={`w-full h-[50%]`}>
        <Image
          src={imageSrc ? imageSrc : "/images/testing.png"}
          alt={title}
          height={600}
          width={600}
          className="object-cover h-full rounded-3xl"
        />
      </div>
      <div className={`${rtl} flex-col px-4`}>
        <div className={`flex flex-row gap-2 `}>
          <p className={`text-secondary text-lg font-bold`}>{category}</p>
        </div>
        <p
          className={`text-primary font-bold text-xl w-fit mt-2 hover:text-primary/70`}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
