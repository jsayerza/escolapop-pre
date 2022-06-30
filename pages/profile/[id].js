import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../context/authContext";

/* import ArticleCard from "components/ArticleCard";
import { map } from "@firebase/util"; */
import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import { HOST_SV } from "../../config/config";

function ProfilePage({ articles }) {
  const { user } = useUser();
  //console.log("ProfilePage/user: ", user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <Layout privateLinks={true}>
      {/* <ProfileBar /> */}

      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        Els meus articles
      </h1>
      <div>
        <ArticleList articles={articles} />
      </div>
    </Layout>
  );
}

/* export const getServerSideProps = async (context) => {
  const { data: articles } = await axios.get(
    HOST_SV + "/api/articles/profile"
  );

  //console.log(articles);
  return {
    props: {
      ses
      articles,
    },
  };
}; */

export const getServerSideProps = async (context) => {
  const { data: articles } = await axios.get(
    HOST_SV + "/api/articles/profile/" + context.query.id
  );

  return {
    props: {
      articles,
    },
  };
};

export default ProfilePage;
