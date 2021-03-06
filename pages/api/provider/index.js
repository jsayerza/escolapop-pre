import { pool } from "../../../config/db";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      //console.log("indexProvider/req: ", req);
      return getRegisterProvider(req, res);

    default:
      res.status(500).json({ server: "This method is not allowed" });
  }
}

const getRegisterProvider = async (req, res) => {
  //console.log("indexProvider/getRegisterProvider/req.body: ", req.body);
  try {
    //const { email, id, username } = req.body;
    const { email, id, username, avatarurl } = req.body;
    //console.log("indexProvider/getRegisterProvider/avatarurl: ", avatarurl);

    const [searchEmail] = await pool.query(
      `SELECT * FROM user WHERE useremail = ?`,
      [email]
    );

    if (searchEmail.length > 0) {
      return res.json({ message: "google provider" });
    }

    const [result] = await pool.query(
      //`INSERT INTO user (useremail, fbkey, username) VALUES ('${email}','${id}','${username}')`
      `INSERT INTO user (useremail, fbkey, username, avatarurl) VALUES (?, ?, ?, ?)`,
      [email, id, username, avatarurl]
    );
    //console.log("getRegisterProvider/result[0]: ", result[0]);
    return res.status(201).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
