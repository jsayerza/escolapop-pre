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
      offset = 15,
    } = req.query;

    let query;
    let pagination = ` LIMIT ${page - 1} * ${offset}, ${offset}`;
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
      query = `SELECT * FROM v_article_sell WHERE 1` + pagination;
    } else {
      query =
        `SELECT * FROM v_article_sell WHERE ((articletitle LIKE '%${keyword}%') OR (description LIKE '%${keyword}%'))` +
        pagination;
    }
    if (category && category !== null && !keyword) {
      query =
        `SELECT * FROM v_article_sell WHERE articlecategory = '${category}'` +
        pagination;
    }

    if (keyword && category) {
      query = query + ` AND articlecategory = '${category}'` + pagination;
    }

    if (category !== null && !keyword) {
      query = query + ` AND articlecategory = '${category}'` + pagination;
    }

    if (min_price && min_price !== null && max_price && max_price !== null) {
      query =
        query + ` AND price BETWEEN ${min_price} AND ${max_price}` + pagination;
    }

    if (location && location !== null) {
      query = query + ` AND location = '${location}'` + pagination;
    }

    if (size && size !== null) {
      query = query + ` AND articlesize = '${size}'` + pagination;
    }

    if (course && course !== null) {
      query = query + ` AND course = '${course}'` + pagination;
    }

    if (order_by && order_by !== null && order_by === "min_price") {
      query = query + ` ORDER BY price` + pagination;
    }

    if (order_by && order_by !== null && order_by === "max_price") {
      query = query + ` ORDER BY price DESC` + pagination;
    }

    if (order_by && order_by !== null && order_by === "min_size") {
      query = query + ` ORDER BY articlesize` + pagination;
    }

    if (order_by && order_by !== null && order_by === "max_size") {
      query = query + ` ORDER BY articlesize DESC` + pagination;
    }

    if (order_by && order_by !== null && order_by === "min_course") {
      query = query + ` ORDER BY course` + pagination;
    }

    if (order_by && order_by !== null && order_by === "max_course") {
      query = query + ` ORDER BY course DESC` + pagination;
    }

    //console.log("search/query: ", query);
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {}
};
