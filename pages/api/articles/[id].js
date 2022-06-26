import { pool } from "../../../config/db";

export default async function handler(req, res) {
  
  //console.log(req.method);

  switch (req.method) {
    case "GET":
      return await getArticle(req, res);
    case "DELETE":
      return await deleteArticle(req, res);
    case "PUT":
      return await updateArticle(req, res);
    default:
      break;
  }
}

const getArticle = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool.query(
      /* "SELECT * FROM article WHERE articleid = ?", */
      "SELECT * FROM v_article WHERE articleid = ?",
      [id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.query;
    //throw new Error("Error-horror");
    await pool.query("DELETE FROM article WHERE articleid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.query;
  const {puttype} = req.body;
  const { articletitle, articlecategoryid, description, price, useremail, articlestatusid, courseid, locationid, publicationstatusid, salestatusid, articlesizeid } = req.body;
  //console.log("updateArticle/req.body: ", req.body);
  //console.log("updateArticle/puttype: ", puttype);
  
  try {
    console.log("updateArticle/puttype/id: ", id);

    switch (puttype) {

      case "salestatus":
        console.log("updateArticle/puttype/salestatus: ", puttype);
        await pool.query(
          "UPDATE article " +
          "SET salestatusid = ? " +
          "WHERE articleid = ?",
          [ salestatusid, id]
        );
        break;

      case "articlevisitcount":
        //console.log("updateArticle/puttype/articlevisitcount: ", puttype);
        await pool.query(
          "UPDATE article " +
          "SET articlevisitcount = articlevisitcount + 1 " +
          "WHERE articleid = ?",
          [id]
        );
        break;
  
      case "articlefavoritecount":
        console.log("updateArticle/puttype/articlefavoritecount: ", puttype);
        await pool.query(
          "UPDATE article " +
          "SET articlefavoritecount = articlefavoritecount + 1 " +
          "WHERE articleid = ?",
          [id]
        );
        break;

      case "articlecontactcount":
        console.log("updateArticle/puttype/articlecontactcount: ", puttype);
        await pool.query(
          "UPDATE article " +
          "SET articlecontactcount = articlecontactcount + 1 " +
          "WHERE articleid = ?",
          [id]
        );
        break;
            
      default:
        console.log("updateArticle/puttype/default: ", puttype);
        await pool.query(
          "UPDATE article " +
          "SET articletitle = ?, articlecategoryid = ?, description = ?, price = ?, useremail = ?, articlestatusid = ?, " +
          "courseid = ?, locationid = ?, publicationstatusid = ?, salestatusid = ?, " +
          "articlesizeid = ? " +
          "WHERE articleid = ?",
          [articletitle, articlecategoryid, description, price, useremail, articlestatusid, courseid, locationid, publicationstatusid, salestatusid, articlesizeid, id]
        );
        break;
    }
  

/*     if (puttype == "salestatus") {
      await pool.query(
        "UPDATE article " +
        "SET salestatusid = ? " +
        "WHERE articleid = ?",
        [ salestatusid, id]
      );

    } else {
      await pool.query(
        "UPDATE article " +
        "SET articletitle = ?, articlecategoryid = ?, description = ?, price = ?, useremail = ?, articlestatusid = ?, " +
        "courseid = ?, locationid = ?, publicationstatusid = ?, salestatusid = ?, " +
        "articlesizeid = ? " +
        "WHERE articleid = ?",
        [articletitle, articlecategoryid, description, price, useremail, articlestatusid, courseid, locationid, publicationstatusid, salestatusid, articlesizeid, id]
      );
        
    }
 */    
    return res.status(204).json();
  } catch (error) {
    console.log(error.message );
    return res.status(500).json({ message: error.message });
  }
};
