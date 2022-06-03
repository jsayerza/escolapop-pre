import { pool } from "config/db";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      getArticlesCourses(req, res);
      break;
    default:
      res.status(500).json({ server: "This method is not allowed" });
  }
}

const getArticlesCourses = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM course");
    return res.json(result);
  } catch (e) {
    res.status(500).json({ server: "Server error" });
  }
};
