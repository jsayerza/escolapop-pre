import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../context/authContext";

import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import { HOST_SV } from "../../config/config";

import ReactPaginate from "react-paginate";

function ProfilePage({ articles }) {
  const { user } = useUser();
  //console.log("ProfilePage/user: ", user);
  const router = useRouter();
  const [currentItems, setCurrentItems] = useState(articles);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      router.push("/login");
    } else {
      //// Si el user no ha aceptado RGPD normas de uso o el user no ha sido aceptado por la AMPA,
      //// no puede entrar y se le redirige a /rgpd
      //console.log("ProfilePage/user.email: ", user.email);

      if ((user.rgpd != 10) || (user.validation != 10)) {
        router.push("/rgpd");
      }
    }
  }, [router, user]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(articles.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(articles.length / itemsPerPage));
  }, [articles, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % articles.length;
    setItemOffset(newOffset);
  };

  return (
    <Layout privateLinks={true}>
      {/* <ProfileBar /> */}

      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        Els meus articles
      </h1>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="següent >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< prèvia"
          renderOnZeroPageCount={null}
          containerClassName="flex flex-wrap gap-4 md:gap-1 justify-center items-center mb-4"
          pageLinkClassName="rounded font-semibold px-3 py-2 hover:bg-orangeAMPA hover:text-white duration-200 transition-all"
          activeClassName="bg-orangeAMPA px-2 py-2 text-sm md:text-base text-white rounded hover:none"
          previousLinkClassName="px-2 md:px-3 py-2 text-sm md:text-base font-semibold bg-white rounded border-2 hover:border-orangeAMPA hover:text-orangeAMPA"
          nextLinkClassName="px-2 md:px-3 py-2 text-sm md:text-base font-semibold bg-white rounded border-2 hover:border-orangeAMPA hover:text-orangeAMPA"
        />

        <ArticleList articles={currentItems} />
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
