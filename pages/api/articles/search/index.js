import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const { category, min_price, max_price, location, size, course, order_by } =
      req.query;

    let query;

    query = `SELECT * FROM v_article_sell WHERE articlecategory != " "`;

    if (category && category !== null) {
      query = `SELECT * FROM v_article_sell WHERE articlecategory = '${category}'`;
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

    //console.log("search/query: ", query);
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
