import axios from "axios";
import Image from "next/image";

import { Layout } from "../components/Layout";
import { HOST_SV } from "../config/config";
//import { VALIDATION_EMAIL } from "../config/config";
import { Home } from "components/Home";
import { Footer } from "../components/Footer";
import { SearchCategoryBar } from "../components/SearchCategoryBar";


function HomePage({ articles }) {

  //console.log("HomePage/HOST_SV: ", HOST_SV );
  //console.log("HomePage/VALIDATION_EMAIL: ", VALIDATION_EMAIL );


  return (
    <Layout>
      <Image
        width={1128}
        height={438}
        src="/escolapop-image.png"
        className="mr-3 h-6 sm:h-9"
        alt=""
      />
      {/* Aqui va la barra de busqueda por categoria */}
      {/* <SearchCategoryBar /> */}
      <SearchCategoryBar 
        className="flex flex-col md:flex-row md:items-center"
      />
      <Home articles={articles} />
      <Footer />
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client.
////   Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  //console.log("getServerSideProps/HOST_SV: ", HOST_SV);

  const { data: articles } = await axios.get(HOST_SV + "/api/articles");
  //console.log("getServerSideProps/articles: ", articles);

  return {
    props: {
      articles,
    },
  };
};

export default HomePage;
