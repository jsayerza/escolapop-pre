import { pool } from "../../../config/db";


export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      //console.log("handler/PUT/req: ", req);
      return await updateRGPD(req, res);

    default:
      break;
  }
}


const updateRGPD = async (req, res) => {
  console.log("updateRGPD/req.body: ", req.body);
  const { answerRGPD, useremail } = req.body;

  try {
    await pool.query(
      "UPDATE user " +
      "SET rgpd = ? " +
      "WHERE useremail = ?",
      [answerRGPD, useremail]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


