import { RiArticleLine } from "react-icons/ri";
import { IoHeartCircle } from "react-icons/io5";
import { AiOutlineUser, AiFillFileAdd } from "react-icons/ai";
import Link from "next/link";


export const ProfileBar = () => {
  return (
    <div className=" mt-2 mb-2 flex justify-start items-center gap-2">

      <button className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
        Els meus articles
        <span className="px-2">
          <RiArticleLine size={"2rem"}/>
        </span>
      </button>

      <Link href="/new">
        <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
          Nou article
          <span className="px-2">
            <AiFillFileAdd size={"2rem"}/>
          </span>
        </a>
      </Link>

      <button className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
        El meu usuari
        <span className="px-2">
          <AiOutlineUser  size={"2rem"}/>
        </span>
      </button>

      <button className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
        Favorits
        <span className="px-2">
          <IoHeartCircle size={"2rem"} />
        </span>
      </button>

    </div>
  );
};
