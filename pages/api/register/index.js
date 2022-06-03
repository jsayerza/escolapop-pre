import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await getRegister(req, res);
    default:
      return;
  }
}

const getRegister = async (req, res) => {
  try {
    const { email } = req.body;

    const [searchEmail] = await pool.query(
      `SELECT * FROM user WHERE useremail = ${email}`
    );

    if (searchEmail !== null ?? searchEmail[0] !== []) {
      return res.status(400).json({ message: "email already exists" });
    }

    const [result] = await pool.query(
      `INSERT INTO user (useremail) VALUE ('${email}')`
    );
    return res.status(201).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
