import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../icons/SearchIcon";
import { HOST_SV } from "config/config";
import { SearchFilterBar } from "./SearchFiltersBar";
import { useShowComponent } from "hooks/useShowComponent";

export default function SearchBar({ keyword, queryObj, filters }) {
  console.log(queryObj, "form the searchBar component");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const inputRef = useRef("");
  const [show, handleShowComponent] = useShowComponent();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(HOST_SV + `/articles/search/${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center w-full my-2 rounded hover:shadow-md transition duration-200">
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
          </div>
        </form>
        {filters && (
          <button
            className="px-2 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600 transition-all duration-200"
            onClick={handleShowComponent}
          >
            Filters
          </button>
        )}
      </div>
      {show && (
        <div className="p-4">
          <SearchFilterBar keyword={keyword} queryObj={queryObj} />
        </div>
      )}
    </>
  );
}
