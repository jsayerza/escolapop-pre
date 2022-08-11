import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "context/authContext";

import { Layout } from "../components/Layout";
import { ArticleForm } from "../components/ArticleForm";


function NewPage() {
  const { user } = useUser();
  //console.log("NewPage/user: ", user);
  const router = useRouter();
  const { id } = router.query;
  //console.log("NewPage/id: ", id);

  useEffect(() => {
    if (!user || (user == null)) {
      //console.log("NewPage/useEffect/NO user --> a fer login!");
      router.push("/login");
    } else {
      //console.log("NewPage/useEffect/user: ", user);
      //console.log("NewPage/useEffect/user.email: ", user.email);
    }

  }, [router, user]);


  return (
    <Layout>
      <div className="grid place-items-center bg-5/6">
        <ArticleForm articleUpdateId={id} />
      </div>
    </Layout>
  );
}

export default NewPage;
