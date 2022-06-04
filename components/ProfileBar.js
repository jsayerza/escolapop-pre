import { RiArticleLine } from "react-icons/ri";
import { IoHeartCircle } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

export const ProfileBar = () => {
  return (
    <div className=" mt-2 mb-4 flex justify-start items-center gap-4">
      <button className="flex gap-2 flex-row-reverse items-center py-2 px-4 font-lato font-semibold text-white bg-orangeAMPA text-2xl rounded">
        Els meus articles
        <span>
          <RiArticleLine />
        </span>
      </button>
      <button className="flex gap-2 flex-row-reverse items-center py-2 px-4 font-lato font-semibold bg-gray-200 text-2xl rounded">
        El meu usuari
        <span>
          <AiOutlineUser />
        </span>
      </button>
      <button className="flex gap-2 flex-row-reverse items-center py-2 px-4 font-lato font-semibold bg-gray-200 text-2xl rounded">
        Favorits
        <span>
          <IoHeartCircle size={"2rem"} />
        </span>
      </button>
    </div>
  );
};