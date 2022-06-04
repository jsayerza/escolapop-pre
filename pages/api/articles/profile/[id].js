import { getSession } from "next-auth/react";
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

    const [user] = await pool.query(
      `
      SELECT FROM user WHERE fbkey = '${id}' 
      `
    );

    if (!user) {
      //console.log("getProfileArticles/session: ", session)
      return res.status(401).json({
        error:
          "Has intentat fer alguna acció incorrecta o no estàs identificat",
      });
    }

    const [result] = await pool.query(
      `
      SELECT * FROM article WHERE useremail = '${user[0].useremail}' ORDER BY datecreation DESC
      `
    );

    return res.status(200).json(result[0]);
  } catch (e) {
    return res.status(500).json({
      error: "Has intentat fer alguna acció incorrecta o no estàs identificat",
    });
  }
};