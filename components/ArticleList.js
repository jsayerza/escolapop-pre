import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Moment from 'moment';
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { FaRegHandshake } from "react-icons/fa"
import { BsBookmark } from "react-icons/bs"

import { HOST_SV } from "../config/config";
import { BadgeSaleStatus } from "../components/BadgeSaleStatus";


export default function ArticleList({ articles }) {
  const router = useRouter();
  Moment.locale('es');

  //console.log(articles, "from article list");

  const handleDelete = async (id) => {
    try {
      //console.log("ArticleList/handleDelete/id: ", id);
      return await axios
        .delete("/api/articles/" + id)
        .then(async (res) => {
          //await axios.delete("/api/articles/images/" + id);
          await axios.delete("/api/articles/images"),
            {
              articleimageid: id,
            };
          toast.success("Article eliminat");
          router.push("/");
        })
        .catch((e) => console.log("handleDelete delete article error: ", e));
    } catch (error) {
      //console.log("ArticleList/handleDelete/error: ", error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (id, salestatusid) => {
    //console.log("ArticleList/handleUpdate/salestatusid: ", salestatusid);
    try {
      //console.log("ArticleList/handleUpdate/id: ", id);
      axios
        .put(HOST_SV + `/api/articles/${id}`, {
          puttype: "salestatus",
          salestatusid: salestatusid,
        })
        .then(async (res) => {
          toast.success("Article reservat/venut");
          router.push("/");
          /* router.push(`/profile/${user.id}`); */
        })
        .catch((e) => console.log("handleUpdate update article error: ", e));
    } catch (error) {
      console.log("ArticleList/handleUpdate/error: ", error);
      //toast.error(error.response.data.message);
    }
  };


  return (
    <div className="flex gap-4 flex-col w-full justify-center">
      {articles &&
        articles.length > 0 &&
        articles.map((article) => (
          
          <div
            className="flex flex-col md:flex-row justify-center md:justify-between items-center border-gray-200 border-b pb-2 px-2 gap-6 transition-all duration-200 hover:bg-white"
            key={article.articleid}
          >

            <div className="flex flex-col md:flex-row md:items-center">

              <div className="rounded">
                {article && article.imageurl && (
                  <Image
                    src={article.imageurl}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="max-w-full h-auto rounded-lg transition-shadow ease-in-out shadow-none"
                    alt="imatge de l$apos;article"
                  />
                )}
              </div>

              <div className="flex flex-col justify-center items-center py-4 px-8">
                <h1 className="textl-lg font-lato font-normal text-gray-900">
                  {article.articletitle}
                </h1>
                <p className="text-sm font-lato font-normal text-gray-500">
                  {article.description}
                </p>
              </div>

              <div className="flex flex-col justify-center items-center py-4 px-8">
                <h1 className="textl-lg font-lato font-normal text-gray-900">
                  Preu
                </h1>
                <h2 className="text-xl font-lato font-bold">
                  {article.price}€
                </h2>
              </div>

              <div className="flex flex-col justify-center items-center py-4 px-8">
                <h1 className="text-lg font-lato font-normal">
                  Modificat
                </h1>
                <h2 className="font-lato font-bold text-gray-500">
                  {/* {article.datecreation} */}
                  {Moment(article.datecreation).format('DD/MM/yyyy')}
                </h2>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex gap-4 justify-center items-center">

                <div className="flex flex-col justify-center items-center py-4 px-8">
                  <h1 className="textl-lg font-lato font-normal text-gray-900">
                    Visites:
                  </h1>
                  <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                    {article.articlevisitcount}
                  </h2>
                </div>

                <div className="flex flex-col justify-center items-center py-4 px-8">
                  <h1 className="textl-lg font-lato font-normal text-gray-900">
                    Contactes:
                  </h1>
                  <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                    {article.articlecontactcount}
                  </h2>
                </div>

                <div className="flex flex-col justify-center items-center py-4 px-8">
                  <h1 className="textl-lg font-lato font-normal text-gray-900">
                    Favorits:
                  </h1>
                  <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                    {article.articlefavoritecount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center items-center">
              
              <div className="flex flex-col justify-center items-center py-4 px-8">
                <h1 className="text-lg font-lato font-normal">
                  {article.publicationstatus}
                </h1>
              </div>

              <div className="flex flex-col justify-center items-center py-4 px-8">
                <h1 className="text-lg font-lato font-normal">
                  {/* {article.salestatus} */}
                  <BadgeSaleStatus status={article.salestatus} />
                </h1>
              </div>



            <div className="flex gap-4 justify-center items-center">
              
              <Tooltip title="Marca com article venut">
                <IconButton size="small">
                  <button
                    className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-greenescola hover:text-white transition-all duration-200"
                    onClick={() => {
                      //console.log("ArticleView/sold/article.articleid: ", article.articleid);
                      handleUpdate(article.articleid, 3);
                    }}
                    
                >
                    <FaRegHandshake size={22} />
                  </button>
                </IconButton>
              </Tooltip>

              <Tooltip title="Marca com article reservat">
                <IconButton size="small">
                    <button
                    className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-orangeAMPA hover:text-white transition-all duration-200"
                    onClick={() => {
                      //console.log("ArticleView/reserved/article.articleid: ", article.articleid);
                      handleUpdate(article.articleid, 2);
                    }}
                    
                >
                      <BsBookmark size={22} />
                    </button>
                </IconButton>
              </Tooltip>

            </div>


              <Tooltip title="Edita el teu article">
                <IconButton size="small">
                  <button
                    className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-gray-400 hover:text-white transition-all duration-200"
                    onClick={() => {
                      //console.log("ArticleView/article.articleid: ", article.articleid)
                      router.push("/articles/edit/" + article.articleid);
                    }}
                  >
                    <FiEdit3 size={22} />
                  </button>
                </IconButton>
              </Tooltip>

              <Tooltip title="Elimina definitivament el teu article">
                <IconButton size="small">
                    <button
                    className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200"
                      onClick={() => handleDelete(article.articleid)}
                    >
                      <AiFillDelete size={22} />
                    </button>
                </IconButton>
              </Tooltip>

            </div>

          </div>
        ))}
    </div>
  );
}
