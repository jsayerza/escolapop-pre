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
      search,
      category,
      min_price,
      max_price,
      location,
      size,
      course,
      order_by,
    } = req.query;
    /*     //console.log({
      categoria: category,
      precio_min: min_price,
      precio_max: max_price,
      locacion: location,
      course: course,
    });
 */
    //let query = `SELECT * FROM v_article_sell WHERE articletitle OR description LIKE '%${search}%'`;

    let query;

    if (search === "*" ?? search === "%") {
      query = `SELECT * FROM v_article_sell WHERE 1`;
    } else {
      query = `SELECT * FROM v_article_sell WHERE ((articletitle LIKE '%${search}%') OR (description LIKE '%${search}%'))`;
    }

    if (category && category !== null) {
      query = query + ` AND (articlecategory = '${category}')`;
    }

    /*     if (min_price && min_price !== null) {
      query = query + ` AND price >= ${min_price}`;
    }

    if (max_price && max_price !== null) {
      query = query + ` AND price <= ${max_price}`;
    } */

    if (min_price && min_price !== null && max_price && max_price !== null) {
      query = query + ` AND (price BETWEEN ${min_price} AND ${max_price})`;
    }

    if (location && location !== null) {
      query = query + ` AND (location = '${location}')`;
    }

    if (size && size !== null) {
      query = query + ` AND (articlesize = '${size}')`;
    }

    if (course && course !== null) {
      query = query + ` AND (course = '${course}')`;
    }

    //// Concatenate ORDER BY. JSM 20220724
    switch (order_by) {
      case "min_price":
        query = query + ` ORDER BY price`;
        break;

      case "max_price":
        query = query + ` ORDER BY price DESC`;
        break;

      case "min_size":
        query = query + ` ORDER BY articlesize`;
        break;
  
      case "max_size":
        query = query + ` ORDER BY articlesize DESC`;
        break;
  
      case "min_course":
        query = query + ` ORDER BY course`;
        break;
  
      case "max_course":
        query = query + ` ORDER BY course DESC`;
        break;
    
      default:
        query = query + ` ORDER BY datecreation DESC`;
    }
  

/*     if (order_by && order_by !== null && order_by === "min_price") {
      query = query + ` ORDER BY price`;
    }
 */
/*     if (order_by && order_by !== null && order_by === "max_price") {
      query = query + ` ORDER BY price DESC`;
    }
 */
/*     if (order_by && order_by !== null && order_by === "min_size") {
      query = query + ` ORDER BY articlesize`;
    }
 */
/*     if (order_by && order_by !== null && order_by === "max_size") {
      query = query + ` ORDER BY articlesize DESC`;
    }
 */
/*     if (order_by && order_by !== null && order_by === "min_course") {
      query = query + ` ORDER BY course`;
    }
 */
/*     if (order_by && order_by !== null && order_by === "max_course") {
      query = query + ` ORDER BY course DESC`;
    }
 */

    //console.log("search/[search]/query: ", query);
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
