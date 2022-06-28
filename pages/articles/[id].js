import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { BsBookmark } from "react-icons/bs";
import { IoHeartCircle } from "react-icons/io5";

import { HOST_SV } from "config/config";
import { Layout } from "../../components/Layout";
import { BadgeStatus } from "components/BadgeStatus";
import { BadgeSaleStatus } from "components/BadgeSaleStatus";
import { useUser } from "context/authContext";
// import { useUser } from "context/authContext";
//import ButtonMailto from "components/ButtonMailTo";

function ArticleView({ article }) {
  // const { user } = useUser();
  //console.log(user);
  //console.log("ArticleView/article: ", article);
  const router = useRouter();
  const { user } = useUser();

  //console.log("ArticleView/article: ", article);
  const subject = "escolapop - Consulta article ";
  const body =
    "Hola, estic interesat/da en l'article que tens publicat a escolapop.";

  const handleDelete = async (id) => {
    try {
      //console.log("handleDelete/id: ", id);
      return await axios
        .delete("/api/articles/" + id)
        .then((res) => {
          //console.log("handleDelete/cap a : ", HOST_SV + `/api/articles/images`);
          //console.log("handleDelete/then/id: ", id);
          axios
            .delete(HOST_SV + `/api/articles/images`, { articleimageid: id })
            .then((res) => {
              //console.log("handleDelete/then/eliminat!");
              toast.success("Article eliminat");
              router.push("/");
            })
            .catch((e) =>
              console.error("handleDelete DELETE image error: ", e)
            );

          return router.push("/");
        })
        .catch((e) => console.log("handleDelete delete article error: ", e));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCounter = async (counterid) => {
    //console.log("id/handleCounter/article.articlevisitcount: ", article.articlevisitcount);
    try {
      //console.log("ArticleList/handleUpdate/article.articleid: ", article.articleid);
      axios
        .put(HOST_SV + `/api/articles/${article.articleid}`, {
          //puttype: "articlevisitcount",
          //puttype: "articlecontactcount",
          //puttype: "articlefavoritecount".
          puttype: counterid,
          useremail: user.email,
        })
        .then(async (res) => {
          //console.log("+1 a comptador visites de: ", id);
          //router.push("/");
          /* router.push(`/profile/${user.id}`); */
        })
        .catch((e) =>
          console.log("articlevisitcount update article counter error: ", e)
        );
    } catch (error) {
      console.log("id/handleCounter/error: ", error);
      //toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    !user && router.push("/login");
    //handleCounter(article.articleid, article.articlevisitcount);
    handleCounter("articlevisitcount");
  }, [user, router, handleCounter]);

  return (
    <Layout>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex justify-center items-center">
          {article.imageurl ? (
            <Image
              src={article.imageurl}
              height={500}
              width={400}
              alt="image of the article"
              className="object-cover"
            />
          ) : (
            "no hay imagen"
          )}
        </div>
        <div className="flex-1 w-full flex-col">
          <div className="py-4 text-3xl text-gray-900 font-lato font-bold flex justify-between items-center">
            <h1>{article.articletitle}</h1>
            <h2>{article.price}€</h2>
          </div>

          <div className="py-4 border-gray-200 border-b">
            <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
              Descripció:
            </h2>
            <p className="text-lg text-gray-600 font-lato font-normal">
              {article.description}
            </p>
          </div>

          <div className="py-2 flex flex-wrap justify-around items-center gap-4 my-4">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Curs:
              </h2>
              <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                {article.course}
              </h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Talla:
              </h2>
              <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                {article.articlesize}
              </h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Ubicació de l&apos;article:
              </h2>
              <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                {article.location} ({article.locationid})
              </h2>
            </div>
          </div>

          <div className="py-2 flex flex-wrap justify-center md:justify-around items-center gap-4 my-4">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Estat de l&apos;article:
              </h2>
              <BadgeStatus status={article.articlestatus} />
            </div>
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Estat de venda:
              </h2>
              <BadgeSaleStatus status={article.salestatus} />
            </div>
          </div>

          <div className="py-2 flex justify-around items-center gap-4 my-4">
            <div>
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Visites:
              </h2>
              <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                {article.articlevisitcount}
              </h2>
            </div>

            <div>
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Contactes:
              </h2>
              <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                {article.articlecontactcount}
              </h2>
            </div>

            <div>
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Favorits:
              </h2>
              <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                {article.articlefavoritecount}
              </h2>
            </div>
          </div>

          <div className="py-2 flex justify-around items-center gap-4 my-4">
            <div>
              <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                Venedor/a:
              </h2>

              <div>
                {article.avatarurl ? (
                  <Image
                    width={50}
                    height={50}
                    src={article.avatarurl}
                    alt="Venedor/a"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <Image
                    width={50}
                    height={50}
                    src="/user-profile-icon.jpg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Venedor/a"
                  />
                )}
                <h2 className="text-lg text-gray-900 font-lato font-bold pb-2">
                  {article.username}
                </h2>
              </div>
            </div>
          </div>

          {/* ///////// */}
          {/* Si user != vendedor, muestra "Cantacta con vendedor" */}
          {user && user.email !== article.useremail && (
            <div className="py-2 flex justify-around items-center gap-4 my-4">
              {/* <div className="my-12 flex justify-center"> */}
              <div>
                <button
                  className="bg-cyan-600 hover:bg-gray-800 text-white text-lg font-lato font-bold rounded ml-2 py-3 px-5"
                  onClick={() => {
                    handleCounter("articlecontactcount");
                    router.push(
                      `mailto:${article.useremail}?subject=${
                        subject + article.articletitle
                      }&body=${body}`
                    );
                  }}
                >
                  Contacta amb el venedor/a
                </button>
              </div>

              <div>
                <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
                  Marcar com preferit
                </h2>
                <Tooltip title="Marca com article preferit">
                  <IconButton size="small">
                    <button
                      className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-greenescola hover:text-white transition-all duration-200"
                      onClick={() => {
                        //console.log("ArticleView/preferit/article.articleid: ", article.articleid);
                        handleCounter("articlefavoritecount");
                      }}
                    >
                      <IoHeartCircle size={22} />
                    </button>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}

          {/* ///////// */}
          {/* Si user == vendedor, muestra botones edit y delete */}
          {user && user.email === article.useremail && (
            <div className="py-5">
              <Tooltip title="Edita el teu article">
                <IconButton size="small">
                  <button
                    /* className="bg-gray-500 hover:bg-gray-800 text-white rounded ml-2 px-3 py-2" */
                    className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-gray-400 hover:text-white transition-all duration-200"
                    onClick={() => {
                      //console.log("ArticleView/article.articleid: ", article.articleid)
                      router.push("/articles/edit/" + article.articleid);
                    }}
                  >
                    {/* Edita article */}
                    <FiEdit3 size={22} />
                  </button>
                </IconButton>
              </Tooltip>

              <Tooltip title="Elimina definitivament el teu article">
                <IconButton size="small">
                  <button
                    /* className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2" */
                    className="px-2 py-2 rounded font-lato font-bold text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200"
                    onClick={() => handleDelete(article.articleid)}
                  >
                    {/* Elimina article */}
                    <AiFillDelete size={22} />
                  </button>
                </IconButton>
              </Tooltip>

              {/* <ButtonMailto label="Contacta amb el venedor" mailto="mailto: ${article.email}" /> */}
            </div>
          )}
          {/* ///////// */}
        </div>
      </div>
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s_executa abans que la pantalla es presenti en el client. Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  const { data: article } = await axios.get(
    HOST_SV + "/api/articles/" + context.query.id
  );
  //console.log("ArticleView/getServerSideProps/article: ", article);

  return {
    props: {
      article,
    },
  };
};

export default ArticleView;
