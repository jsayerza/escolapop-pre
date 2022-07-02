import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoHeartCircle } from "react-icons/io5";
import { AiOutlineUser, AiFillFileAdd } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export const NavbarLinks = ({ user, logout, privateLinks = false }) => {
  if (privateLinks) {
    return (
      <>
        <li>
          <Tooltip title="Publica un nou article">
            <Link href="/new">
              <IconButton size="small">
                <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                  Nou article
                  <span className="px-2">
                    <AiFillFileAdd size={"2rem"} />
                  </span>
                </a>
              </IconButton>
            </Link>
          </Tooltip>
        </li>

        <li>
          <Tooltip title="Detalls i configuració del meu usuari">
            <Link href="/userSettings">
              <IconButton size="small">
                <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                  El meu usuari
                  <span className="px-2">
                    <AiOutlineUser size={"2rem"} />
                  </span>
                </a>
              </IconButton>
            </Link>
          </Tooltip>
        </li>

        <li>
          <Tooltip title="La meva llista de desitjos">
            <Link href="/favorites">
              <IconButton size="small">
                <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                  Favorits
                  <span className="px-2">
                    <IoHeartCircle size={"2rem"} />
                  </span>
                </a>
              </IconButton>
            </Link>
          </Tooltip>
        </li>

        {user && (
          <li>
            <Tooltip title="Logout. Surt o canvia d'usuari">
              <IconButton
                size="small"
                onClick={logout}
                className="rounded-full hover:cursor-pointer bg-transparent flex  flex-col"
              >
                <Image
                  width={32}
                  height={32}
                  src={user.avatar}
                  alt="avatar image"
                  className="h-10 w-10 rounded-full"
                />
              </IconButton>
            </Tooltip>
          </li>
        )}
      </>
    );
  }

  return (
    <>
      <li>
        <Tooltip title="La meva àrea d'usuari/a">
          <IconButton size="small">
            <Link href={user ? `/profile/${user.id}` : `/login`}>
              <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-2 font-lato font-normal text-black border rounded font-lato font-lato font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                El meu Escolapop
                <span className="px-2">
                  <CgProfile size={"2rem"} />
                </span>
              </a>
            </Link>
          </IconButton>
        </Tooltip>
      </li>
      <li>
        <Tooltip title="Què és Escolapop?">
          <IconButton size="small">
            <Link href="/about">
              <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-2 font-lato font-normal text-black border rounded font-lato font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                Sobre Escolapop
                <span className="px-2">
                  <AiFillInfoCircle size={"2rem"} />
                </span>
              </a>
            </Link>
          </IconButton>
        </Tooltip>
      </li>
      <li>
        {user ? (
          <Tooltip title="Logout. Surt o canvia d'usuari">
            <IconButton
              size="small"
              onClick={logout}
              className="rounded-full hover:cursor-pointer bg-transparent flex  flex-col"
            >
              {user && user.avatar ? (
                <Image
                  width={32}
                  height={32}
                  src={user.avatar}
                  alt="avatar image"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <>
                  <FaUserCircle size={"2rem"} color="white" />
                  {user.name ? user.name : "user"}
                </>
              )}
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Login. Entra a Escolapop">
            <IconButton size="small">
              <Link href="/login">
                <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-2 font-lato font-normal text-black border rounded font-lato font-lato font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                  Login
                </a>
              </Link>
            </IconButton>
          </Tooltip>
        )}
      </li>
    </>
  );
};
