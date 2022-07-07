//import { useUser } from "context/authContext";

import { pool } from "config/db";

export default async function handler(req, res) {
  //console.log("favorites/handler/req: ", req)

  switch (req.method) {
    case "GET":
      return await getFavoritesArticles(req, res);

    default:
      return await getFavoritesArticles(req, res);
  }
}

const getFavoritesArticles = async (req, res) => {
  //console.log("getFavoritesArticles/req: ", req)

  try {
    const { id } = req.query;
    //console.log("getFavoritesArticles/id: ", id);

    const [user] = await pool.query(
      `
      SELECT * FROM user WHERE fbkey = ?
      `,
      [id]
    );

    //console.log("favorites/getFavoritesArticles/user: ", user);

    if (!user) {
      //console.log("getFavoritesArticles/session: ", session)
      return res.status(401).json({
        error:
          "Has intentat fer alguna acció incorrecta o no estàs identificat",
      });
    }

    //console.log("favorites/getFavoritesArticles/user[0].useremail: ", user[0].useremail);

    const [result] = await pool.query(
      `
      SELECT * FROM v_favorites WHERE favoriteuseremail = ? ORDER BY datecreation DESC
      `,
      [user[0].useremail]
    );

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      error: "Has intentat fer alguna acció incorrecta o no estàs identificat",
    });
  }
};
