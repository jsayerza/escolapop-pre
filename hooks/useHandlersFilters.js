import { useRouter } from "next/router";

export const useHandlersFilters = ({
  setActiveCategory,
  setActiveCourse,
  setActiveLocation,
  setActivePrice,
  setActiveSizes,
  handleCloseModal,
  handleCloseModalCourse,
  handleCloseModalLocation,
  handleCloseModalPrice,
  handleCloseModalSizes,
  keyword,
  queryObj,
}) => {
  const router = useRouter();
  let path = keyword ? `/articles/search/${keyword}` : `/articles/search`;

  const handleCategory = async (articleCategory) => {
    await router.push({
      pathname: path,
      query: {
        category: articleCategory,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
    setActiveCategory(true);
    handleCloseModal();
  };

  const handleLocation = async (location) => {
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: location,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
    setActiveLocation(true);
    handleCloseModalLocation();
  };

  const handleSize = async (size) => {
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: size,
        course: queryObj.course ? queryObj.course : null,
      },
    });
    setActiveSizes(true);
    handleCloseModalSizes();
  };

  const handleCourse = async (course) => {
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: course,
      },
    });
    setActiveCourse(true);
    handleCloseModalCourse();
  };

  const handlePrice = async (minPrice, maxPrice) => {
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: minPrice ? minPrice : queryObj.min_price,
        max_price: maxPrice ? maxPrice : queryObj.max_price,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
    setActivePrice(true);
    handleCloseModalPrice();
  };

  const handleResetCategory = async () => {
    setActiveCategory(false);
    await router.push({
      pathname: path,
      query: {
        category: null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
  };

  const handleResetSizes = async () => {
    setActiveSizes(false);
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
  };

  const handleResetCourse = async () => {
    setActiveCourse(false);
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: null,
      },
    });
  };

  const handleResetLocation = async () => {
    setActiveLocation(false);
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
  };

  const handleResetPrice = async () => {
    setActivePrice(false);
    await router.push({
      pathname: path,
      query: {
        category: queryObj.category ? queryObj.category : null,
        min_price: null,
        max_price: null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
      },
    });
  };
  return {
    handleCategory,
    handleCourse,
    handleLocation,
    handlePrice,
    handleSize,
    handleResetCategory,
    handleResetCourse,
    handleResetLocation,
    handleResetPrice,
    handleResetSizes,
  };
};
