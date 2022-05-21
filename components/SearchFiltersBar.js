import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal } from "./Modal";
import { HOST_SV } from "config/config";
import { useModal } from "hooks/useModal";
import axios from "axios";
import { useActiveFilters } from "hooks/useActiveFilters";
import { ButtonFilter } from "./ButtonFilter";

export const SearchFilterBar = ({ queryObj, keyword }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);
  const [price, setPrice] = useState([]);
  const [activeCategory, setActiveCategory] = useActiveFilters();
  const [activeLocation, setActiveLocation] = useActiveFilters();
  const [activePrice, setActivePrice] = useActiveFilters();
  const [isOpen, handleToggleModal, handleCloseModal] = useModal();
  const [isOpenLocation, handleToggleModalLocation, handleCloseModalLocation] =
    useModal();
  const [isOpenPrice, handleToggleModalPrice, handleCloseModalPrice] =
    useModal();

  const handleCategory = async (articleCategory) => {
    await router.push({
      pathname: `/articles/search/${keyword}`,
      query: {
        category: articleCategory,
        price: queryObj.price ? queryObj.price : null,
        location: queryObj.location ? queryObj.location : null,
      },
    });
    setActiveCategory(true);
    handleCloseModal();
  };

  const handleLocation = async (location) => {
    await router.push({
      pathname: `/articles/search/${keyword}`,
      query: {
        category: queryObj.category ? queryObj.category : null,
        price: queryObj.price ? queryObj.price : null,
        location: location,
      },
    });
    setActiveLocation(true);
    handleCloseModalLocation();
  };

  const handleResetCategory = async () => {
    setActiveCategory(false);
    await router.push({
      pathname: `/articles/search/${keyword}`,
      query: {
        category: null,
        price: queryObj.price ? queryObj.price : null,
        location: queryObj.location ? queryObj.location : null,
      },
    });
  };

  const handleResetLocation = async () => {
    setActiveLocation(false);
    await router.push({
      pathname: `/articles/search/${keyword}`,
      query: {
        category: queryObj.category ? queryObj.category : null,
        price: queryObj.price ? queryObj.price : null,
        location: null,
      },
    });
  };

  useEffect(() => {
    function getCategories() {
      axios
        .get(HOST_SV + "/api/articles/categories")
        .then((res) => setCategories(res.data));
    }
    getCategories();
  }, []);

  useEffect(() => {
    function getLocation() {
      axios
        .get(HOST_SV + "/api/articles/location")
        .then((res) => setLocation(res.data));
    }
    getLocation();
  }, []);

  useEffect(() => {
    function getLocation() {
      axios
        .get(HOST_SV + "/api/articles/location")
        .then((res) => setLocation(res.data));
    }
    getLocation();
  }, []);

  return (
    <div className="flex gap-6 justify-center items-center">
      <div className="relative">
        {activeCategory ? (
          <ButtonFilter
            handlerClick={handleResetCategory}
            active={activeCategory}
          >
            {queryObj.category}
          </ButtonFilter>
        ) : (
          <>
            <ButtonFilter handlerClick={handleToggleModal}>
              Category
            </ButtonFilter>
            <Modal isOpen={isOpen} closeModal={handleCloseModal}>
              {categories.map((category) => (
                <button
                  key={category.articlecategory.id}
                  value={category.articlecategory}
                  onClick={() => handleCategory(category.articlecategory)}
                  className="px-6 py-4 rounded font-bold bg-slate-300"
                >
                  {category.articlecategory}
                </button>
              ))}
            </Modal>
          </>
        )}
      </div>
      <div className="relative">
        {activeLocation ? (
          <ButtonFilter
            handlerClick={handleResetLocation}
            active={activeLocation}
          >
            {queryObj.location}
          </ButtonFilter>
        ) : (
          <>
            <ButtonFilter handlerClick={handleToggleModalLocation}>
              Location
            </ButtonFilter>
            <Modal
              isOpen={isOpenLocation}
              closeModal={handleCloseModalLocation}
            >
              {location.map((location) => (
                <button
                  key={location.locationid}
                  value={location.location}
                  onClick={() => handleLocation(location.location)}
                  className="px-6 py-4 rounded font-bold bg-slate-300"
                >
                  {location.location}
                </button>
              ))}
            </Modal>
          </>
        )}
      </div>

      <div className="relative">
        {activePrice ? (
          <ButtonFilter active={activePrice}>{queryObj.location}</ButtonFilter>
        ) : (
          <>
            <ButtonFilter handlerClick={handleToggleModalPrice}>
              Price
            </ButtonFilter>
            <Modal isOpen={isOpenPrice} closeModal={handleCloseModalPrice}>
              <div className="flex justify-center items-center">
                <div>
                  <h1>Min</h1>
                  <input type="number" className="border-gray-900" />
                </div>
                <div>
                  <h1>Max</h1>
                  <input type="number" />
                </div>
                <ButtonFilter>filter</ButtonFilter>
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
