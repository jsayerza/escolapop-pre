import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { HOST_SV } from "../../../config/config";
import { Layout } from "../../../components/Layout";
import SearchBar from "../../../components/SearchBar";
import { SearchResults } from "../../../components/SearchResults";
import { useUser } from "context/authContext";
import { OrderButton } from "components/OrderButton";

function SearchWithoutParams({ searchQuery, queryObj }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      router.push("/login");
    } else {
      //// Si el user no ha aceptado RGPD normas de uso o el user no ha sido aceptado por la AMPA,
      //// no puede entrar y se le redirige a /rgpd
      //console.log("search/index/user.email: ", user.email);

      if (user.rgpd !== 10 || user.validation !== 10) {
        router.push("/rgpd");
      }
    }
  }, [router, user]);

  return (
    <Layout>
      <SearchBar queryObj={queryObj} filters={true} />
      {queryObj.keyword && (
        <h1 className="font-semibold text-3xl p-4">
          {searchQuery.length > 0
            ? `Resultats de cerca de '${queryObj.keyword}'`
            : `No hi ha resultats de '${queryObj.keyword}'`}
        </h1>
      )}
      {!queryObj.keyword && queryObj.category && (
        <h1 className="font-semibold text-3xl p-4">
          {searchQuery.length > 0
            ? `Resultats de categoria '${queryObj.category}'`
            : `No hi ha resultats de categoria '${queryObj.category}'`}
        </h1>
      )}

      <div className="flex flex-col gap-2">
        <OrderButton queryObj={queryObj} />

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <SearchResults searched={searchQuery} />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  //console.log(context.query?.search?.category, "in the server response");
  //console.log("index/getServerSideProps/context: ", context);
  const queryObj = context.query;
  //console.log("index/getServerSideProps/queryObj: ", queryObj);
  const { data: searchQuery } = await axios.get(
    HOST_SV + "/api/articles/search",
    {
      params: {
        keyword: context.query?.keyword ? context.query.keyword : "*",
        category: context.query?.category,
        size: context.query?.size,
        min_price: context.query?.min_price ? context.query?.min_price : 0,
        max_price: context.query?.max_price ? context.query?.max_price : 9999,
        location: context.query?.location,
        course: context.query?.course,
        order_by: context.query?.order_by,
        page: context.query?.page ? context.query.page : 1,
        offset: context.query?.offset ? context.query.offset : 10,
      },
    }
  );
  //console.log("index/context.query: ", context.query);
  //console.log("index/searchQuery: ", searchQuery);

  return {
    props: {
      searchQuery,
      queryObj,
    },
  };
};

export default SearchWithoutParams;
