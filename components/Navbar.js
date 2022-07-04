import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useUser } from "context/authContext";
import { NavbarLinks } from "./NavbarLinks";
import Link from "next/link";

export const Navbar = ({ privateArea }) => {
  const { user, firebaseLogout } = useUser();
  const [toggle, setToggle] = useState(false);

  const toggleButtonAction = () => {
    setToggle(!toggle);
  };

  const mobileClases = clsx("w-full md:block md:w-auto", {
    ["relative"]: toggle,
    ["hidden"]: !toggle,
  });

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="container flex flex-wrap md:flex-row justify-between items-center mx-auto">
        <Link href={"/"}>
          <a className="flex gap-2 items-center">
            <Image
              width={54}
              height={50}
              src="/LogoAmpaSF-Blanc.png"
              className="mr-3 h-6 sm:h-9"
              alt=""
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Escolapop
            </span>
          </a>
        </Link>
        <button
          onClick={toggleButtonAction}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={mobileClases} id="mobile-menu">
          <ul className="flex justify-center items-center flex-col mt-4 md:flex-row space-x-1 space-y-2 md:space-y-0 lg:space-x-6 md:mt-0 md:text-sm md:font-medium">
            <NavbarLinks
              user={user}
              logout={firebaseLogout}
              privateLinks={privateArea}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};
