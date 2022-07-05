import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "context/authContext";
import { toast } from "react-toastify";

import { Tooltip, IconButton } from "@mui/material";
import { FaRegHandshake } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import { HOST_SV } from "../config/config";
import { BadgeStatus } from "../components/BadgeStatus";

export const FavoriteButtons = ({ publicationStatus, saleStatus, article }) => {
  const router = useRouter();
  const { user } = useUser();

  const handleDeleteFavorite = async (articleid) => {
    try {
      //console.log("ArticleList/handleDeleteFavorite/articleid: ", articleid);
      //console.log("ArticleList/handleDeleteFavorite/user.email: ", user.email);
      console.log(articleid);
      return await axios.delete(
        HOST_SV + `/api/articles/favorites?aid=${articleid}&email=${user.email}`
      );
    } catch (error) {
      //console.log("ArticleList/handleDeleteFavorite/error: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center items-center">
      <Tooltip title="Elimina l'article de la teva llista de favorits">
        <IconButton size="small">
          <button
            className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200 z-20"
            onClick={() => handleDeleteFavorite(article.articleid)}
          >
            <AiFillDelete size={22} />
          </button>
        </IconButton>
      </Tooltip>
    </div>
  );
};
