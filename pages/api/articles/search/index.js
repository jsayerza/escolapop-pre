import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const {
      category,
      min_price,
      max_price,
      location,
      size,
      course,
      order_by,
      keyword,
      page = 1,
      offset = 10,
    } = req.query;

    let query;
    let pagination = ` LIMIT ${
      (parseInt(page) - 1) * parseInt(offset)
    }, ${parseInt(offset)}`;
    /*     query =
      keyword !== null || keyword !== undefined
        ? `SELECT * FROM v_article_sell WHERE ((articletitle LIKE '%${keyword}%') OR (description LIKE '%${keyword}%'))`
        : `SELECT * FROM v_article_sell WHERE articlecategory != " "`; */

    if (
      keyword === "" ||
      keyword === " " ||
      keyword === "*" ||
      keyword === "%" ||
      !keyword
    ) {
      query = `SELECT * FROM v_article_sell WHERE 1`;
    } else {
      query = `SELECT * FROM v_article_sell WHERE ((articletitle LIKE '%${keyword}%') OR (description LIKE '%${keyword}%'))`;
    }
    if (category && category !== null && !keyword) {
      query = `SELECT * FROM v_article_sell WHERE articlecategory = '${category}'`;
    }

    if (keyword && category) {
      query = query + ` AND articlecategory = '${category}'`;
    }

    if (category !== null && !keyword) {
      query = query + ` AND articlecategory = '${category}'`;
    }

    if (min_price && min_price !== null && max_price && max_price !== null) {
      query = query + ` AND price BETWEEN ${min_price} AND ${max_price}`;
    }

    if (location && location !== null) {
      query = query + ` AND location = '${location}'`;
    }

    if (size && size !== null) {
      query = query + ` AND articlesize = '${size}'`;
    }

    if (course && course !== null) {
      query = query + ` AND course = '${course}'`;
    }

    if (order_by && order_by !== null && order_by === "min_price") {
      query = query + ` ORDER BY price`;
    }

    if (order_by && order_by !== null && order_by === "max_price") {
      query = query + ` ORDER BY price DESC`;
    }

    if (order_by && order_by !== null && order_by === "min_size") {
      query = query + ` ORDER BY articlesize`;
    }

    if (order_by && order_by !== null && order_by === "max_size") {
      query = query + ` ORDER BY articlesize DESC`;
    }

    if (order_by && order_by !== null && order_by === "min_course") {
      query = query + ` ORDER BY course`;
    }

    if (order_by && order_by !== null && order_by === "max_course") {
      query = query + ` ORDER BY course DESC`;
    }

    query = query + pagination;

    console.log("search/index/query: ", query);
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
