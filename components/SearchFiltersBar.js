import { Modal } from "./Modal";
import { useModal } from "hooks/useModal";
import { useActiveFilters } from "hooks/useActiveFilters";
import { ButtonFilter } from "./ButtonFilter";
import { useFilters } from "hooks/useFilters";
import { useHandlersFilters } from "hooks/useHandlersFilters";

export const SearchFilterBar = ({ queryObj, keyword }) => {
  const {
    categories,
    course,
    location,
    maxPrice,
    minPrice,
    sizes,
    handleChangeMax,
    handleChangeMin,
  } = useFilters();
  const [activeCategory, setActiveCategory] = useActiveFilters();
  const [activeLocation, setActiveLocation] = useActiveFilters();
  const [activeSizes, setActiveSizes] = useActiveFilters();
  const [activePrice, setActivePrice] = useActiveFilters();
  const [activeCourse, setActiveCourse] = useActiveFilters();
  const [isOpen, handleToggleModal, handleCloseModal] = useModal();
  const [isOpenLocation, handleToggleModalLocation, handleCloseModalLocation] =
    useModal();
  const [isOpenPrice, handleToggleModalPrice, handleCloseModalPrice] =
    useModal();
  const [isOpenSizes, handleToggleModalSizes, handleCloseModalSizes] =
    useModal();
  const [isOpenCourse, handleToggleModalCourse, handleCloseModalCourse] =
    useModal();

  const {
    handleAllCategory,
    handleCategory,
    handleCourse,
    handleLocation,
    handlePrice,
    handleResetCategory,
    handleResetCourse,
    handleResetLocation,
    handleResetPrice,
    handleResetSizes,
    handleSize,
  } = useHandlersFilters({
    keyword,
    queryObj,
    setActiveCategory,
    setActiveLocation,
    setActivePrice,
    setActiveSizes,
    setActiveCourse,
    handleCloseModal,
    handleCloseModalCourse,
    handleCloseModalLocation,
    handleCloseModalPrice,
    handleCloseModalSizes,
  });

  return (
    <div className="flex flex-wrap gap-4 lg:flex-row justify-center items-center w-full border-b p-4">
      <div className="relative">
        {activeCategory ? (
          <ButtonFilter
            handlerClick={handleResetCategory}
            active={activeCategory}
          >
            {queryObj.category ? queryObj.category : "Totes les categories"}
          </ButtonFilter>
        ) : (
          <>
            <ButtonFilter handlerClick={handleToggleModal} isOpen={isOpen}>
              Totes les categories
            </ButtonFilter>
            <Modal isOpen={isOpen} closeModal={handleCloseModal}>
              <button
                onClick={handleAllCategory}
                className="px-6 py-4 rounded font-lato font-bold bg-slate-300"
              >
                Totes les categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.articlecategory.id}
                  value={category.articlecategory}
                  onClick={() => handleCategory(category.articlecategory)}
                  className="px-6 py-4 rounded font-lato font-bold bg-slate-300"
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
            <ButtonFilter
              handlerClick={handleToggleModalLocation}
              isOpen={isOpenLocation}
            >
              Localitat
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
                  className="px-6 py-4 rounded font-lato font-bold bg-slate-300"
                >
                  {location.location} ({location.locationid})
                </button>
              ))}
            </Modal>
          </>
        )}
      </div>

      <div className="relative">
        {activeSizes ? (
          <ButtonFilter handlerClick={handleResetSizes} active={activeSizes}>
            {queryObj.size}
          </ButtonFilter>
        ) : (
          <>
            <ButtonFilter
              handlerClick={handleToggleModalSizes}
              isOpen={isOpenSizes}
            >
              Talla
            </ButtonFilter>
            <Modal isOpen={isOpenSizes} closeModal={handleCloseModalSizes}>
              {sizes.map((size) => (
                <button
                  key={size.articlesizeid}
                  value={size.articlesize}
                  onClick={() => handleSize(size.articlesize)}
                  className="px-6 py-4 rounded font-lato font-bold bg-slate-300"
                >
                  {size.articlesize}
                </button>
              ))}
            </Modal>
          </>
        )}
      </div>

      <div className="relative">
        {activeCourse ? (
          <ButtonFilter handlerClick={handleResetCourse} active={activeCourse}>
            {queryObj.course}
          </ButtonFilter>
        ) : (
          <>
            <ButtonFilter
              handlerClick={handleToggleModalCourse}
              isOpen={isOpenCourse}
            >
              Curs
            </ButtonFilter>
            <Modal isOpen={isOpenCourse} closeModal={handleCloseModalCourse}>
              {course.map((course) => (
                <button
                  key={course.courseid}
                  value={course.course}
                  onClick={() => handleCourse(course.course)}
                  className="px-6 py-4 rounded font-bold bg-slate-300"
                >
                  {course.course}
                </button>
              ))}
            </Modal>
          </>
        )}
      </div>

      <div className="relative">
        {activePrice ? (
          <ButtonFilter active={activePrice} handlerClick={handleResetPrice}>
            {queryObj.min_price + " - " + queryObj.max_price}
          </ButtonFilter>
        ) : (
          <>
            <ButtonFilter
              handlerClick={handleToggleModalPrice}
              isOpen={isOpenPrice}
            >
              Preu
            </ButtonFilter>
            <Modal isOpen={isOpenPrice} closeModal={handleCloseModalPrice}>
              <div className="flex flex-col gap-2 justify-center items-center lg:items-end lg:flex-row md:gap-1">
                <div>
                  <h1>Min</h1>
                  <input
                    type="number"
                    className="border-gray-300 p-1 border rounded focus:outline-2 focus:outline-orange-400"
                    onChange={handleChangeMin}
                  />
                </div>
                <div>
                  <h1>Max</h1>
                  <input
                    type="number"
                    className="border-gray-300 p-1 border rounded focus:outline-2 focus:outline-orange-400"
                    onChange={handleChangeMax}
                  />
                </div>
                <ButtonFilter
                  handlerClick={() => handlePrice(minPrice, maxPrice)}
                >
                  Aplica
                </ButtonFilter>
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
