import { experimentalStyled } from "@mui/material";
import { pool } from "../../../config/db";


export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return getRegister(req, res);

    default:
      res.status(500).json({ server: "Aquest mètod no està permès" });
  }
}

const getRegister = async (req, res) => {
 //console.log("indexRegister/getRegister/req.body: ", req.body)
  try {
    /* const { email, id, username } = req.body; */
    const { email, id, username, avatarurl } = req.body;
   //console.log("indexRegister/getRegister/id: ", id)
   //console.log("indexRegister/getRegister/email: ", email)
   //console.log("indexRegister/getRegister/username: ", username)
   //console.log("indexRegister/getRegister/avatarurl: ", avatarurl)

    const [searchEmail] = await pool.query(
      `SELECT * FROM user WHERE useremail = ?`,
      [email]
    );

    if (searchEmail.length > 0) {
      return res.status(400).json({ message: "Aquest email ja existeix" });
    }

   //console.log("indexRegister/getRegister/VA A FER INSERT DE email: ", email)
    /* TODO: Hacer INSERT si no existe, UPDATE si existe???  */
    const [result] = await pool.query(
      /* `INSERT INTO user (useremail, fbkey, username) VALUES ('${email}','${id}','${username}')` */
      `INSERT INTO user (useremail, fbkey, username, avatarurl) VALUES (?, ?, ?, ?)`,
      [email, id, username, avatarurl]
    );
    //console.log("index/getRegister/result[0]: ", result[0]);
    return res.status(201).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
