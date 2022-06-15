import axios from "axios";
import { HOST_SV } from "../../../config/config";
import { Layout } from "../../../components/Layout";
import SearchBar from "../../../components/SearchBar";
import { SearchResults } from "../../../components/SearchResults";

function SearchWithoutParams({ searchQuery, queryObj }) {
  //console.log("search/searchQuery: ", searchQuery, search);
  return (
    <Layout>
      <SearchBar queryObj={queryObj} filters={true} />

      <div className="flex flex-col gap-2">
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
  const queryObj = context.query;
  console.log(queryObj);
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
      },
    }
  );
  console.log(searchQuery);

  return {
    props: {
      searchQuery,
      queryObj,
    },
  };
};

export default SearchWithoutParams;
