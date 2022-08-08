import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "context/authContext";

import ArticleFavoriteList from "../components/ArticleFavoriteList";
import Layout from "../components/Layout";
import { HOST_SV } from "../config/config";
//import { NavbarPrivateArea } from "../components/NavbarPrivateArea";

function FavoritesPage() {
  const { user } = useUser();
  //console.log("favorites/user: ", user);
  const router = useRouter();
  const [favoritesArticles, setFavoritesArticles] = useState([]);

  useEffect(() => {
    //console.log("favoritesArticles/useEffect/user: ", user);
    //console.log("favoritesArticles/useEffect/user.email: ", user.email);
    !user || (user === null && router.push("/login"));

    try {
      //console.log(`/api/articles/favorites/${user.id}`);
      {
        /* <Link href={user ? `/profile/${user.id}` : `/login`}> */
      }

      axios
        .get(HOST_SV + `/api/articles/favorites/${user.id}`, {
          email: user.email,
        })
        .then((data) => {
          //console.log("favoritesArticles/useEffect/pa setFavoritesArticles!");
          //console.log("favoritesArticles/data: ", data.data);
          setFavoritesArticles(data.data);
        });
    } catch (error) {
      console.log("favoritesArticles/error: ", error);
    }
  }, [router, user]);

  return (
    <Layout privateLinks={true}>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        Els meus favorits
      </h1>
      <div>
        <ArticleFavoriteList articles={favoritesArticles} />
      </div>
    </Layout>
  );
}

export default FavoritesPage;
