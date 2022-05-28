import { useState, useEffect } from "react";
import axios from "axios";
import { HOST_SV } from "config/config";

export const useFilters = () => {
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [course, setCourses] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);

  const handleChangeMin = (e) => {
    setMinPrice(e.target.value);
  };

  const handleChangeMax = (e) => {
    setMaxPrice(e.target.value);
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
    function getSizes() {
      axios
        .get(HOST_SV + "/api/articles/size")
        .then((res) => setSizes(res.data));
    }
    getSizes();
  }, []);

  useEffect(() => {
    function getCourses() {
      axios
        .get(HOST_SV + "/api/articles/course")
        .then((res) => setCourses(res.data));
    }
    getCourses();
  }, []);

  return {
    categories,
    course,
    location,
    maxPrice,
    minPrice,
    sizes,
    handleChangeMin,
    handleChangeMax,
  };
};
