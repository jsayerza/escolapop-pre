import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { RiArticleLine } from "react-icons/ri";
import { IoHeartCircle } from "react-icons/io5";
import { AiOutlineUser, AiFillFileAdd } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useUser } from "context/authContext";

export function NavbarPrivateArea() {
  const { user, handleGoogleLogin, firebaseLogout } = useUser();
  const [toggle, setToggle] = useState(false);
  //console.log("NavbarPrivateArea/user: ", user);
  // const { user, handleGoogleLogin } = useUser();
  const toggleButtonAction = () => {
    setToggle(!toggle);
    //console.log("toggleButtonAction/toggle: ", toggle);
  };

  const mobileClases = clsx(
    "justify-between items-center w-full md:flex md:w-auto md:order-1",
    {
      ["relative"]: toggle,
      ["hidden"]: !toggle,
    }
  );

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4  dark:bg-gray-800 fixed top-0 left-0 right-0 h-16 z-50">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <Image
              width={54}
              height={50}
              src="/LogoAmpaSF-Blanc.png"
              className="mr-3 h-6 sm:h-9"
              alt=""
            />
            <span className="text-gray-600 self-center text-3xl font-lato font-black whitespace-nowrap dark:text-white px-2">
              Escolapop
            </span>
          </a>
        </Link>
        <div className="flex items-center md:order-2 md:hidden">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"></img> */}
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown"
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">
                xxx
              </span>
              <span className="block text-sm font-lato font-light text-gray-500 truncate dark:text-gray-400">
                adm.escolapop@gmail.com
              </span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={toggleButtonAction}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className={mobileClases} id="mobile-menu-2">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-lato font-light md:justify-center md:items-center text-center">
            <li>
              <Tooltip title="Publica un nou article">
                <IconButton size="small">
                  <Link href="/new">
                    <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                      Nou article
                      <span className="px-2">
                        <AiFillFileAdd size={"2rem"} />
                      </span>
                    </a>
                  </Link>
                </IconButton>
              </Tooltip>
            </li>

            <li>
              <Tooltip title="Detalls i configuració del meu usuari">
                <IconButton size="small">
                  <Link href="/usersettings">
                    <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                      El meu usuari
                      <span className="px-2">
                        <AiOutlineUser size={"2rem"} />
                      </span>
                    </a>
                  </Link>
                </IconButton>
              </Tooltip>
            </li>

            <li>
              <Tooltip title="La meva llista de desitjos">
                <IconButton size="small">
                  <Link href="/favorites">
                    <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                      Favorits
                      <span className="px-2">
                        <IoHeartCircle size={"2rem"} />
                      </span>
                    </a>
                  </Link>
                </IconButton>
              </Tooltip>
            </li>

            <li className="pt-1">
{/*               {user ? (
                <div className="rounded-full hover:cursor-pointer">
                  <Image
                    width={32}
                    height={32}
                    onClick={() => firebaseLogout()}
                    src={user.avatar}
                    alt="avatar image"
                    className="h-10 w-10 rounded-full bg-gray-100 "
                  />
                </div>
              ) : (
                <Link href="/login">
                  <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                    Login
                  </a>
                </Link>
              )}
 */}
              {user ? (
                <div className="rounded-full hover:cursor-pointer">
                  {user.avatar ? (
                    <Image
                      width={32}
                      height={32}
                      onClick={() => firebaseLogout()}
                      src={user.avatar}
                      alt="avatar image"
                      className="h-10 w-10 rounded-full bg-gray-100 "
                    />
                  ):(
                    <Image
                      width={32}
                      height={32}
                      onClick={() => firebaseLogout()}
                      src="/user-profile-icon.jpg"
                      alt="avatar image"
                      className="h-10 w-10 rounded-full bg-gray-100 "
                    />
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <a className="bg-gray-100 flex items-center justify-center m-auto py-2 px-4 font-lato font-normal text-black border rounded font-bold w-full hover:bg-orangeAMPA hover:text-black transition-all ease duration-200">
                    Login
                  </a>
                </Link>
              )}



            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
