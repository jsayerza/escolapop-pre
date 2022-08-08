import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Moment from "moment";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";

import { HOST_SV } from "../config/config";
import { FavoriteButtons } from "./FavoriteButtons";
import { BadgeSaleStatus } from "../components/BadgeSaleStatus";

export default function ArticleFavoriteList({ articles }) {
  //console.log("ArticleFavoriteList/articles: ", articles);
  const router = useRouter();
  Moment.locale("es");

  //console.log(articles, "from article list");

  return (
    <div className="flex gap-4 flex-col w-full justify-center">
      {(articles && (articles.length > 0)) ?
        (
        articles.map((article) => (
          <Link href={`/articles/${article.articleid}`} key={article.articleid}>
            <a>
              <div
                className="flex flex-col lg:flex-row justify-center md:justify-between items-center border-gray-200 border-b pb-2 px-2 gap-4 transition-all duration-200 hover:bg-white"
                key={article.articleid}
              >
                <div className="rounded flex justify-center">
                  {article && article.imageurl && (
                    <Image
                      src={article.imageurl}
                      width={200}
                      height={200}
                      objectFit="cover"
                      className="max-w-full h-auto rounded-lg transition-shadow ease-in-out shadow-none"
                      alt="imatge de l'article"
                    />
                  )}
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-center">
                  <div className="flex flex-col w-full justify-center items-center py-2 px-1">
                    <h1 className="textl-lg font-lato font-normal text-gray-900">
                      {article.articletitle}
                    </h1>
                    <p className="text-sm font-lato font-normal text-gray-500">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center py-2 px-4">
                    <h1 className="textl-lg font-lato font-normal text-gray-900">
                      Preu
                    </h1>
                    <h2 className="font-lato font-bold text-gray-500">
                      {article.price}€
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col justify-center md:flex-row md:items-center">
                  <div className="flex flex-col gap-2 py-2 md:py-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex flex-wrap justify-center lg:justify-between items-center">
                        <div className="flex justify-center">
                          <div className="flex flex-col justify-center items-center py-2 px-4">
                            {article.salestatus}
                          </div>
                        </div>

                        <FavoriteButtons
                          article={article}
                          saleStatus={article.articlestatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))
        )
        :
        (
          <div>No tens articles favorits</div>
        )
      }
    </div>
  );
}
