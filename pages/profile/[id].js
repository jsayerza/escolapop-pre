import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../context/authContext";

import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import { HOST_SV } from "../../config/config";
import { NavbarPrivateArea } from "../../components/NavbarPrivateArea";
import { ProfileBar } from "../../components/ProfileBar";


function ProfilePage({ articles }) {
  const { user } = useUser();
  console.log("ProfilePage/user: ", user);
  const router = useRouter();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      router.push("/login");
    }
/*     //// Si el user no ha aceptado RGPD  normas de uso o el user no ha sido aceptado por la AMPA, 
      //// no puede entrar y se le redirige a /rgpd
    if ((user.rgpd != 10) || (user.validation != 10) ) {
      router.push("/rgpd");
    }
 */    
    console.log("ProfilePage/user.email: ", user.email);
    user &&
      axios.get(HOST_SV + "/api/rgpd", { useremail: user.email, })
      .then((data) => {
        console.log("ProfilePage/data: ", data);
        return setUserData(data);
      })
      .then((userData) => {
        console.log("ProfilePage/data: ", userData);
        if ((userData.rgpd != 10) || (userData.validation != 10) ) {
          router.push("/rgpd");
        }
   
      });

  }, [router, user]);

  return (
    <Layout>
      <NavbarPrivateArea />
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
