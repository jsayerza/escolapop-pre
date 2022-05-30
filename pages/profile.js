import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { HOST_SV } from "../config/config";
import { useRouter } from "next/router";

/* import ArticleCard from "components/ArticleCard";
import { map } from "@firebase/util"; */
import ArticleList from "../components/ArticleList";
import { ProfileBar } from "components/ProfileBar";
import { useUser } from "context/authContext";

function ProfilePage() {
  const { user } = useUser();
  console.log(user);
  const router = useRouter();
  const [profileArticles, setProfileArticles] = useState([]);

  useEffect(() => {
    async function getProfileArticles() {
      if (!user || user === null || user === undefined) {
        return router.push("/login");
      }

      if (user) {
        const { data } = await axios.get(HOST_SV + "/api/articles/profile", {
          email: user.email,
        });
        //console.log("profileArticles/data: ", data);
        setProfileArticles(data);
      }
    }

    getProfileArticles();
  }, [router, user]);

  return (
    <Layout>
      <ProfileBar />

      <h1 className="text-left text-2xl font-bold my-2">Els teus articles</h1>
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
