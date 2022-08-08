import { pool } from "../../../config/db";


export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      //console.log("handler/PUT/req: ", req);
      return await updateRGPD(req, res);

    case "GET":
      return await getUserRGPD(req, res);

    default:
      break;
  }
}


const updateRGPD = async (req, res) => {
  //console.log("updateRGPD/req.body: ", req.body);
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


const getUserRGPD = async (req, res) => {
  //const { useremail } = req.body;
  const { useremail } = req.query;
 //console.log("getUserRGPD/req.query: ", req.query);
 //console.log("getUserRGPD/useremail: ", useremail);
  try {
    const [user] = await pool.query(
/*       `SELECT * FROM user WHERE useremail = '${useremail}'` */
      "SELECT * FROM user WHERE useremail = ?",
      [useremail]
    );

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({
      error: "Has intentat fer alguna acció incorrecta o no estàs identificat",
    });
  }
};

