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

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      router.push("/login");
    }
    console.log("SearchBar/handleSubmit/user: ", user);
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
