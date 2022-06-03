import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../icons/SearchIcon";
import { IoOptionsOutline } from "react-icons/io5";
import { HOST_SV } from "config/config";
import { SearchFilterBar } from "./SearchFiltersBar";
import { useShowComponent } from "hooks/useShowComponent";

export default function SearchBar({ keyword, queryObj, filters }) {
  console.log(queryObj, "form the searchBar component");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [resetSearch, setResetSearch] = useState(false);
  const inputRef = useRef(null);
  const [show, handleShowComponent] = useShowComponent();

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetSearch(true);
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
          <input
            className="p-2 text-md font-lato font-normal shadow-sm w-full outline-none"
            type="text"
            placeholder="Cerca un article"
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
      )}
    </>
  );
}
