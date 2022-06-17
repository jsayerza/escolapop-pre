import axios from "axios";
import { HOST_SV } from "../../../config/config";
import { Layout } from "../../../components/Layout";
import SearchBar from "../../../components/SearchBar";
import { SearchResults } from "../../../components/SearchResults";
import { OrderButton } from "components/OrderButton";

function Search({ searchQuery, search, queryObj }) {
  //console.log("search/searchQuery: ", searchQuery, search);
  return (
    <Layout>
      <SearchBar queryObj={queryObj} keyword={search} filters={true} />
      <h1 className="font-semibold text-3xl p-4">
        Resultats de cerca de {`'${search}'`}
      </h1>

      <div className="flex flex-col gap-2">
        <OrderButton queryObj={queryObj} keyword={search} />

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <SearchResults searched={searchQuery} />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  //console.log(context.query?.search?.category, "in the server response");
  console.log(context);
  const { search } = context.query;
  const queryObj = context.query;
  console.log(queryObj.order_by, "ORDEN");
  const { data: searchQuery } = await axios.get(
    HOST_SV + "/api/articles/search/" + context.query.search,
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

  return {
    props: {
      searchQuery,
      search,
      queryObj,
    },
  };
};

export default Search;
