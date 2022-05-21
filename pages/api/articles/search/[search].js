import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const { search, category, min_price, max_price, location } = req.query;
    console.log({
      categoria: category,
      precio_min: min_price,
      precio_max: max_price,
      locacion: location,
    });
    //console.log("setSearch/search: ", search);

    let query = `SELECT * FROM v_article_sell WHERE articletitle LIKE '%${search}%'`;

    if (category && category !== null) {
      // `SELECT * FROM v_article_sell WHERE articletitle LIKE '%${search}%' AND articlecategory = '${category}'`
      query = query + ` AND articlecategory = '${category}'`;
    }

    /*     if (min_price && min_price !== null) {
      query = query + ` AND price >= ${min_price}`;
    }

    if (max_price && max_price !== null) {
      query = query + ` AND price <= ${max_price}`;
    } */

    if (min_price && min_price !== null && max_price && max_price !== null) {
      query = query + ` AND price >= ${min_price} AND price <= ${max_price}`;
    }

    if (location && location !== null) {
      query = query + ` AND location = '${location}'`;
    }

    console.log(query);
    const [result] = await pool.query(query);
    //console.log("setSearch/result: ", result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
