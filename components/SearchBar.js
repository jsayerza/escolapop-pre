import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../icons/SearchIcon";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoOptionsOutline } from "react-icons/io5";
import { HOST_SV } from "config/config";
import { SearchFilterBar } from "./SearchFiltersBar";
import { useShowComponent } from "hooks/useShowComponent";
import { useUser } from "context/authContext";

export default function SearchBar({ keyword = "", queryObj, filters }) {
  //console.log(queryObj, "form the searchBar component");
  const router = useRouter();
  const [search, setSearch] = useState(keyword);
  const [resetSearch, setResetSearch] = useState(false);
  const inputRef = useRef(null);
  const [show, handleShowComponent] = useShowComponent();
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetSearch(true);
    if (!user) {
      return router.push("/login");
    }
    /*     if (search === "" || search === undefined) {
      return router.push(HOST_SV + `/articles/search/`);
    } */
    router.push(HOST_SV + `/articles/search?keyword=${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
    // En caso de dejarlo todo por defecto en la busqueda descomentar
    // router.push(HOST_SV + `/articles/search`);
  };

  useEffect(() => {
    if (search) {
      inputRef.current.value = search;
    } else {
      inputRef.current.value = "";
    }
  }, [search]);

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="w-full flex">
          <form className="relative w-full" onSubmit={handleSubmit}>
            <div className="relative flex justify-center items-center w-full my-2 rounded hover:shadow-md transition duration-200">
              <div className="p-2 bg-white">
                <SearchIcon />
              </div>
              <input
                className="p-2 text-md font-semibold shadow-sm w-full outline-none"
                type="text"
                placeholder="Cerca un article"
                onChange={handleChange}
                ref={inputRef}
              />
              {search && search !== "" && search.length > 0 && (
                <span
                  className="text-gray-800 p-1 bg-white hover:cursor-pointer hover:text-red-500 transition-colors duration-200"
                  onClick={handleClear}
                >
                  <AiOutlineCloseCircle size="2rem" />
                </span>
              )}
            </div>
          </form>
        </div>
        {filters && (
          <button
            className="flex flex-row-reverse items-center gap-1 px-2 md:px-4 py-2 md:text-lg font-bold text-white bg-orange-500 rounded hover:bg-orange-600 transition-all duration-200"
            onClick={handleShowComponent}
          >
            <h2 className="hidden md:block">Filtres</h2>
            <span>
              <IoOptionsOutline size={"1.8rem"} />
            </span>
            {/* show && (
              <span className="bg-transparent rounded-full font-bold">
                <IoIosCloseCircle size={"1.8rem"} />
              </span>
            ) */}
          </button>
        )}
      </div>
      {show && (
        <div className="py-2">
          <SearchFilterBar keyword={keyword} queryObj={queryObj} />
        </div>
      )}
    </>
  );
}
