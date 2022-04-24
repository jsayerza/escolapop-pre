import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { HOST_SV, PORT_SV } from "config/config";
import { Layout } from "../../components/Layout";
import Image from "next/image";
//import ButtonMailto from "components/ButtonMailTo";

function ArticleView({ article }) {
  //console.log("article: ", article);

  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      //console.log(id);
      return await axios
        .delete("/api/articles/" + id)
        .then(async (res) => {
          await axios.delete("/api/articles/images/" + id);
          toast.success("Article eliminat");
          router.push("/");
        })
        .catch((e) => console.log("handleDelete delete article error: ", e));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 w-full">
          {article.imageurl ? (
            <Image
              src={article.imageurl}
              height={600}
              width={600}
              alt="image of the article"
            />
          ) : (
            "no hay imagen"
          )}
        </div>
        <div className="flex-1 w-full flex-col">
          <div className="py-4 text-3xl text-gray-900 font-bold flex justify-between items-center">
            <h1>{article.articletitle}</h1>
            <h2>{article.price}€</h2>
          </div>

          <div className="py-4 border-gray-200 border-b">
            <h2 className="text-lg text-gray-900 font-semibold pb-2">
              Description
            </h2>
            <p className="text-lg text-gray-600 font-semibold">
              {article.description}
            </p>
          </div>

          <div className="py-2 flex justify-around items-center gap-4 my-4">
            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Status
              </h2>
              <span className="rounded-full font-bold bg-green-600 px-3 py-1 text-white">
                {article.articlestatus}
              </span>
            </div>

            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Location
              </h2>
              <h2 className="text-lg text-gray-900 font-bold pb-2">
                {article.location}
              </h2>
            </div>
          </div>

          <div className="py-2 flex justify-around items-center gap-4 my-4">
            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Publication Status
              </h2>
              <span className="rounded-full font-bold bg-green-600 px-3 py-1 text-white">
                {article.publicationstatus}
              </span>
            </div>

            <div>
              <h2 className="text-lg text-gray-900 font-semibold pb-2">
                Sale status
              </h2>
              <h2 className="text-lg text-gray-900 font-bold pb-2">
                {article.salestatus}
              </h2>
            </div>
          </div>

          <div className="my-12 flex justify-center">
            <button
              className="bg-cyan-600 hover:bg-gray-800 text-white text-lg font-bold rounded ml-2 px-5 py-3"
              onClick={() => router.push(`mailto:${article.useremail}`)}
            >
              Contacta amb el venedor
            </button>
          </div>
        </div>
      </div>

      <div className="py-5">
        <button
          className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2"
          onClick={() => handleDelete(article.articleid)}
        >
          Elimina article
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-800 text-white rounded ml-2 px-5 py-2"
          onClick={() => {
            //console.log("ArticleView/article.articleid: ", article.articleid)
            router.push("/articles/edit/" + article.articleid);
          }}
        >
          Edita article
        </button>
        {/* <ButtonMailto label="Contacta amb el venedor" mailto="mailto: ${article.email}" /> */}
      </div>
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client. Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  const { data: article } = await axios.get(
    HOST_SV + PORT_SV + "/api/articles/" + context.query.id
  );
  //console.log("ArticleView/getServerSideProps/article: ", article);

  return {
    props: {
      article,
    },
  };
};

export default ArticleView;
