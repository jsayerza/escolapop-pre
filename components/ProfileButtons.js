import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Tooltip, IconButton } from "@mui/material";
import { FaRegHandshake } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import { HOST_SV } from "../config/config";
import { BadgeStatus } from "../components/BadgeStatus";


export const ProfileButtons = ({ publicationStatus, saleStatus, article }) => {
  const router = useRouter();

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
    console.log("ProfileButtons/handleUpdate/salestatusid: ", salestatusid);
    try {
      console.log("ProfileButtons/handleUpdate/id: ", id);
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
    <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center items-center">

      <div className="flex flex-col justify-center items-center py-2 px-2">
        <h1 className="textl-lg font-lato font-normal text-gray-900">
          {article.articlestatus}
        </h1>
        {/* <BadgeStatus status={articleStatus} /> */}
      </div>

      <div className="flex flex-col justify-center items-center py-2 px-4">
        <h1 className="textl-lg font-lato font-normal text-gray-900">
          {publicationStatus}
        </h1>
      </div>

      <div className="flex gap-1 md:gap-4 justify-center items-center">
        <Tooltip title="Marca com article venut">
          <IconButton size="small">
            <button
              className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-greenescola hover:text-white transition-all duration-200"
              onClick={() => {
                console.log("ProfileButtons/sold/article.articleid: ", article.articleid);
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
  );
};
