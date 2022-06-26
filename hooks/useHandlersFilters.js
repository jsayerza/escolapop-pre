import { useRouter } from "next/router";

export const useHandlersFilters = ({
  setActiveCategory,
  setActiveCourse,
  setActiveLocation,
  setActivePrice,
  setActiveSizes,
  setActiveOrder,
  handleCloseModal,
  handleCloseModalCourse,
  handleCloseModalLocation,
  handleCloseModalPrice,
  handleCloseModalSizes,
  handleCloseOrderModal,
  keyword,
  queryObj,
}) => {
  const router = useRouter();
  let path = `/articles/search`;

  const handleAllCategory = async () => {
    await router.push({
      pathname: `/articles/search`,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
    setActiveCategory(true);
    handleCloseModal();
  };

  const handleCategory = async (articleCategory) => {
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: articleCategory,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
    setActiveCategory(true);
    handleCloseModal();
  };

  const handleLocation = async (location) => {
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: location,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
    setActiveLocation(true);
    handleCloseModalLocation();
  };

  const handleSize = async (size) => {
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: size,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
    setActiveSizes(true);
    handleCloseModalSizes();
  };

  const handleCourse = async (course) => {
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
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
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: minPrice ? minPrice : queryObj.min_price,
        max_price: maxPrice ? maxPrice : queryObj.max_price,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
    setActivePrice(true);
    handleCloseModalPrice();
  };

  const handleOrder = async (order) => {
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: order,
      },
    });
    setActiveOrder(true);
    handleCloseOrderModal();
  };

  const handleResetCategory = async () => {
    setActiveCategory(false);
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
  };

  const handleResetSizes = async () => {
    setActiveSizes(false);
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
  };

  const handleResetCourse = async () => {
    setActiveCourse(false);
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
  };

  const handleResetLocation = async () => {
    setActiveLocation(false);
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: queryObj.min_price ? queryObj.min_price : null,
        max_price: queryObj.max_price ? queryObj.max_price : null,
        location: null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
  };

  const handleResetPrice = async () => {
    setActivePrice(false);
    await router.push({
      pathname: path,
      query: {
        keyword: queryObj.keyword ? queryObj.keyword : null,
        category: queryObj.category ? queryObj.category : null,
        min_price: null,
        max_price: null,
        location: queryObj.location ? queryObj.location : null,
        size: queryObj.size ? queryObj.size : null,
        course: queryObj.course ? queryObj.course : null,
        order_by: queryObj.order_by ? queryObj.order_by : null,
      },
    });
  };
  return {
    handleAllCategory,
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
    handleOrder,
  };
};
