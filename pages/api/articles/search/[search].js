import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const { search, category, min_price, max_price, location, size, course } =
      req.query;
    /*     //console.log({
      categoria: category,
      precio_min: min_price,
      precio_max: max_price,
      locacion: location,
      course: course,
    });
 */
    //let query = `SELECT * FROM v_article_sell WHERE articletitle OR description LIKE '%${search}%'`;

    let query = `SELECT * FROM v_article_sell WHERE ((articletitle LIKE '%${search}%') OR (description LIKE '%${search}%'))`;

    if (category && category !== null) {
      query = query + ` AND articlecategory = '${category}'`;
    }

    /*     if (min_price && min_price !== null) {
      query = query + ` AND price >= ${min_price}`;
    }

    if (max_price && max_price !== null) {
      query = query + ` AND price <= ${max_price}`;
    } */

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

    //console.log("search/query: ", query);
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
