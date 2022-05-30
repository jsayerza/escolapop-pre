import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeStatus } from "./BadgeStatus";

function ArticleCard({ article }) {
  //console.log("ArticleCard/article.imageurl: ", article.imageurl);
  return (
    <Link href={`/articles/${article.articleid}`} key={article.articleid}>
      <a>
        <div className="border border-gray-200 shadow-sm flex flex-col min-w-md max-w-md duration-300 hover:shadow-lg rounded bg-white">
          <div className="flex flex-wrap justify-center">
            {article.imageurl ? (
              <Image
                src={article.imageurl}
                width={432}
                height={345}
                objectFit="cover"
                className="max-w-full h-auto rounded-lg transition-shadow ease-in-out shadow-none"
                alt="image of the article"
              />
            ) : (
              "No hi ha imatge"
            )}
          </div>
          <div className="p-5">
            <h3 className="text-md font-lato font-bold text-greenescola">
              {article.articlecategory}
            </h3>
            <div className="py-2">
              <h1 className="text-2xl font-lato font-bold text-center text-orangeAMPA">
                {article.articletitle}
              </h1>
            </div>
            <p className="font-lato font-bold text-gray-800 py-4 text-lg">
              {article.description}
            </p>
            <div className="flex flex-col gap-1 justify-start items-start">
              <span className="font-lato font-normal text-gray-800">
                Estat de conservació:
              </span>
              <BadgeStatus status={article.articlestatus} />
            </div>
            <div className="flex gap-2 py-1 items-center">
              <p className="font-lato font-normal text-gray-800">Curs:</p>
              <h3 className="font-lato font-normal text-gray-800 text-lg">
                {article.course}
              </h3>
            </div>
            <div className="flex gap-2 py-1 items-center">
              <p className="font-lato font-normal text-gray-800">Talla:</p>
              <h3 className="font-lato font-normal text-gray-800 text-lg">
                {article.articlesize}
              </h3>
            </div>
            <div className="flex gap-2 py-1 items-center">
              <p className="font-lato font-normal text-gray-800">Ubicació:</p>
              <h3 className="font-lato font-normal text-gray-800 text-lg">
                {article.location} ({article.locationid})
              </h3>
            </div>
            <h2 className="text-right text-2xl font-lato font-normal">
              {article.price} €
            </h2>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default React.memo(ArticleCard);
