import { pool } from "../../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getImage(req, res);
    case "POST":
      return await saveImage(req, res);
    case "PUT":
      //console.log("handler/PUT/req: ", req);
      return await updateImage(req, res);
    case "DELETE":
      //console.log("handler/DELETE/req: ", req);
      return await deleteImage(req, res);

    default:
      break;
  }
}

const getImage = async (req, res) => {
  try {
    ////TODO: Revisar! ¿estamos recuperando todas las imagenes de la DB?
    const [result] = await pool.query("SELECT * FROM articleimage");
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ e });
  }
};

const saveImage = async (req, res) => {
  try {
    //console.log("artticles-images-index/saveImage/req.body: ", req.body);
    const { articleId, url, imagerefpath } = req.body;
    //console.log("artticles-images-index/saveImage/imagerefpath: ", imagerefpath);
    ////TODO: Por ahora forzamos 'mainimage: 1' ya que solo usamos una imagen. Se tendrá q gestionar cuando haya más imágenes. JSM 20220422
    const [result] = await pool.query(
      `INSERT INTO articleimage (articleid, imageurl, mainimage, imagerefpath) VALUES (?, ?, ?, ?)`, 
      [ articleId, url, '1', imagerefpath]
    );
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const updateImage = async (req, res) => {
  //console.log("updateImage/req.body: ", req.body);
  //const { id } = req.query;
  const { imageurl, articleimageid } = req.body;
  //const { imageurl } = req.body;
  try {
    await pool.query(
      "UPDATE articleimage " +
        "SET imageurl = ?, mainimage = 1 " +
        "WHERE articleid = ?",
      [imageurl, articleimageid]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteImage = async (req, res) => {
  //console.log("index/deleteImage/req.body: ", req.body);
  //console.log("index/deleteImage/req.query: ", req.query);
  const { articleid } = req.query;
  //const { articleid } = req.body;
  //console.log("index/deleteImage/articleid: ", articleid);
  try {
    await pool.query(
      "DELETE FROM articleimage WHERE articleid = ?", 
      [ articleid ]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
