import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const { category, min_price, max_price, location, size, course } =
      req.query;

    let query;

    query = `SELECT * FROM v_article_sell WHERE articlecategory != " "`;

    if (category && category !== null) {
      query = `SELECT * FROM v_article_sell WHERE articlecategory = '${category}'`;
    }

    if (min_price && min_price !== null && max_price && max_price !== null) {
      query = query + ` AND price BETWEEN ${min_price} AND ${max_price}`;
    }

    if (location && location !== null && category) {
      query = query + ` AND location = '${location}'`;
    }

    if (size && size !== null && category) {
      query = query + ` AND articlesize = '${size}'`;
    }

    if (course && course !== null && category) {
      query = query + ` AND course = '${course}'`;
    }

    //console.log("search/query: ", query);
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
