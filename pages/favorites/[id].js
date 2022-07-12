import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../context/authContext";

import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import { HOST_SV } from "../../config/config";
import { NavbarPrivateArea } from "../../components/NavbarPrivateArea";


function FavoritesPage({ articles }) {
  const { user } = useUser();
  console.log("FavoritesPage/user: ", user);
  const router = useRouter();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      router.push("/login");
    }
    //console.log("SearchBar/handleSubmit/user: ", user);

    //// Si el user no ha aceptado RGPD normas de uso o el user no ha sido aceptado por la AMPA, 
    //// no puede entrar y se le redirige a /rgpd
    //console.log("favorites/[id]/user.email: ", user.email);

    if ((user.rgpd != 10) || (user.validation != 10) ) {
      router.push("/rgpd");
    }

/*     user &&
      axios.get(HOST_SV + `/api/rgpd?useremail=${user.email}`)
      .then((userData) => {
        console.log("favorites/[id]/userData: ", userData);
        console.log("favorites/[id]/userData.data[0]: ", userData.data[0]);

        if ((userData.data[0].rgpd != 10) || (userData.data[0].validation != 10) ) {
          router.push("/rgpd");
        }
        return setUserData(userData.data[0]);
      });
 */

  }, [router, user]);

  return (
    <Layout>
      <NavbarPrivateArea />

      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        Els meus favorits
      </h1>
      <div>
        <ArticleList articles={articles} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: articles } = await axios.get(
    HOST_SV + "/api/articles/favorites/" + context.query.id
  );

  return {
    props: {
      articles,
    },
  };
};

export default FavoritesPage;
