import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "../icons/SearchIcon";
import { HOST_SV } from "config/config";
import axios from "axios";
import { Modal } from "../components/Modal";
import { useModal } from "hooks/useModal";

export default function SearchBar({ change, queryObj }) {
  console.log(queryObj, "form the searchBar component");
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isOpen, handleToggleModal, handleCloseModal] = useModal();
  const [search, setSearch] = useState("");
  console.log(categories);

  useEffect(() => {
    function getCategories() {
      axios
        .get(HOST_SV + "/api/articles/categories")
        .then((res) => setCategories(res.data));
    }
    getCategories();
  }, []);

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
            className="p-2 text-md font-semibold shadow-sm w-full outline-none"
            type="text"
            placeholder="Cerca un article"
            onChange={handleChange}
          />
        </div>
        <div className="ml-2 flex justify-center">
          <select
            className="form-select block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option disabled className="text-center">
              Categories
            </option>
            {categories.map((category) => (
              <option
                key={category.articlecategory.id}
                value={category.articlecategory}
              >
                {category.articlecategory}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="relative">
        <button
          className="relative px-4 py-2 bg-gray-200 font-bold rounded z-20"
          onClick={handleToggleModal}
        >
          modal
        </button>
        <Modal isOpen={isOpen} closeModal={handleCloseModal}>
          <h1>PERRO</h1>
        </Modal>
      </div>
    </>
  );
}
