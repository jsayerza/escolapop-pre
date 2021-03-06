import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProfileArticles(req, res);
    default:
      return await getProfileArticles(req, res);
  }
}

const getProfileArticles = async (req, res) => {
  try {
    const { id } = req.query;
    //console.log("getProfileArticles/id: ", id);

    const [user] = await pool.query(
      `
      SELECT * FROM user WHERE fbkey = ?
      `,
      [id]
    );

    //console.log("profile/getProfileArticles/user: ", user);

    if (!user) {
      //console.log("getProfileArticles/session: ", session)
      return res.status(401).json({
        error:
          "Has intentat fer alguna acció incorrecta o no estàs identificat",
      });
    }

    const [result] = await pool.query(
      `
      SELECT * FROM v_article WHERE useremail = ? ORDER BY datecreation DESC
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
