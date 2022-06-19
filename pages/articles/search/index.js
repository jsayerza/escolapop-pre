import { useEffect } from "react";
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
    }
  }, [router, user]);

  return (
    <Layout>
      <SearchBar queryObj={queryObj} filters={true} />

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
        category: context.query?.category,
        size: context.query?.size,
        min_price: context.query?.min_price ? context.query?.min_price : 0,
        max_price: context.query?.max_price ? context.query?.max_price : 9999,
        location: context.query?.location,
        course: context.query?.course,
        order_by: context.query?.order_by,
      },
    }
  );
  //console.log("index/searchQuery: ", searchQuery);

  return {
    props: {
      searchQuery,
      queryObj,
    },
  };
};

export default SearchWithoutParams;
