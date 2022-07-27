import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "context/authContext";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { HOST_SV, ITEMSXPAGE } from "../../../config/config";
import { Layout } from "../../../components/Layout";
import SearchBar from "../../../components/SearchBar";
import { SearchResults } from "../../../components/SearchResults";
import { OrderButton } from "components/OrderButton";


function SearchWithoutParams({ searchQuery, queryObj }) {
  const { user } = useUser();
  const router = useRouter();
  const [currentItems, setCurrentItems] = useState(searchQuery);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  //const itemsPerPage = 25;
  const itemsPerPage = ITEMSXPAGE;

  //console.log("search/index/HOST_SV: ", HOST_SV);
  //console.log("search/index/ITEMSXPAGE: ", ITEMSXPAGE);
  //console.log("search/index/itemsPerPage: ", itemsPerPage);
  

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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(searchQuery.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchQuery.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, searchQuery]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchQuery.length;
    setItemOffset(newOffset);
  };

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
        <div className="flex md:flex-row flex-col gap-2 justify-center items-center md:items-end md:justify-between">
          <OrderButton queryObj={queryObj} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="següent >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            pageCount={pageCount}
            previousLabel="< prèvia"
            renderOnZeroPageCount={null}
            containerClassName="flex flex-wrap gap-4 md:gap-1 justify-center items-center"
            pageLinkClassName="rounded font-semibold px-3 py-2 hover:bg-orangeAMPA hover:text-white duration-200 transition-all"
            activeClassName="bg-orangeAMPA px-2 py-2 text-sm md:text-base text-white rounded hover:none"
            previousLinkClassName="px-2 md:px-3 py-2 text-sm md:text-base font-semibold bg-white rounded border-2 hover:border-orangeAMPA hover:text-orangeAMPA"
            nextLinkClassName="px-2 md:px-3 py-2 text-sm md:text-base font-semibold bg-white rounded border-2 hover:border-orangeAMPA hover:text-orangeAMPA"
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <SearchResults searched={currentItems} />
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
