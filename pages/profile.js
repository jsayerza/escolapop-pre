import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

/* import ArticleCard from "components/ArticleCard";
import { map } from "@firebase/util"; */
import ArticleList from "../components/ArticleList";
import Layout from "../components/Layout";
import { HOST_SV } from "../config/config";
import { NavbarPrivateArea } from "../components/NavbarPrivateArea";


function ProfilePage() {
  const router = useRouter();
  const [profileArticles, setProfileArticles] = useState([]);

  useEffect(() => {
    async function getProfileArticles() {
      const session = await getSession();
      if (!session || session === null || session === undefined) {
        return router.push("/");
      }

      if (session) {
        const { data } = await axios.get(
          HOST_SV + "/api/articles/profile"
        );
        //console.log("profileArticles/data: ", data);
        setProfileArticles(data);
      }
    }

    getProfileArticles();
  }, [router]);

  return (
    <Layout>
      <NavbarPrivateArea />

      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">Els meus articles</h1>
      <div>
        <ArticleList articles={profileArticles} />
      </div>
    </Layout>
  );
}

/* export const getServerSideProps = async (context) => {
  const { data: articles } = await axios.get(
    HOST_SV + "/api/articles/profile"
  );

  console.log(articles);
  return {
    props: {
      ses
      articles,
    },
  };
}; */

export default ProfilePage;
