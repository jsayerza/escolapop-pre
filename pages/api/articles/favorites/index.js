import { pool } from "config/db";


export default async function handler(req, res) {
  //console.log("favorites/handler/req: ", req)
  //console.log("favorites/handler/got it! ")

  switch (req.method) {
    case "DELETE":
      return await deleteFavoriteArticle(req, res);
  
    default:
        return await deleteFavoriteArticle(req, res);
    }
}


const deleteFavoriteArticle =  (req, res) => {
  console.log("index/deleteFavoriteArticle/req.body: ", req.body);
  const { articleid, useremail } =  req.body;
  console.log("index/deleteFavoriteArticle/articleid: ", articleid);
  console.log("index/deleteFavoriteArticle/useremail: ", useremail);

  try {
     pool.query(
      "DELETE FROM userarticlefavorite WHERE (useremail = ? AND articleid = ?)", 
      [useremail, articleid]
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

