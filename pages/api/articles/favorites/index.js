import { pool } from "config/db";

export default async function handler(req, res) {
  //console.log("favorites/handler/req: ", req)
  //console.log("favorites/handler/got it! ")

  switch (req.method) {
    case "DELETE":
      return await deleteFavoriteArticle(req, res);

    default:
      return await deleteFavoriteArticle(req, res);
  }
}

const deleteFavoriteArticle = async (req, res) => {
  try {
    const { aid, email } = req.query;
    console.log("index/deleteFavoriteArticle/articleid: ", aid);
    console.log("index/deleteFavoriteArticle/useremail: ", email);

    await pool.query(
      "DELETE FROM userarticlefavorite WHERE (useremail = ? AND articleid = ?)",
      [email, aid]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
