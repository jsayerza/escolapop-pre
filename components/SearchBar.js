import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../icons/SearchIcon";
import { HOST_SV } from "config/config";
import axios from "axios";
import { Modal } from "../components/Modal";
import { useModal } from "hooks/useModal";
import { SearchFilterBar } from "./SearchFiltersBar";

export default function SearchBar({ keyword, queryObj, filters }) {
  console.log(queryObj, "form the searchBar component");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const inputRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(HOST_SV + `/articles/search/${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full md:w-1/2 my-2 rounded hover:shadow-md transition duration-200">
          <div className="p-2 bg-white">
            <SearchIcon />
          </div>
          <input
            className="p-2 text-md font-lato font-normal shadow-sm w-full outline-none"
            type="text"
            placeholder="Cerca un article"
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
      </form>
      {filters && <SearchFilterBar keyword={keyword} queryObj={queryObj} />}
    </>
  );
}
