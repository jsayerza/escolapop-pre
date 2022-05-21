import axios from "axios";
import { HOST_SV } from "../../../config/config";
import { Layout } from "../../../components/Layout";
import SearchBar from "../../../components/SearchBar";
import { SearchResults } from "../../../components/SearchResults";

function Search({ searchQuery, search, queryObj }) {
  console.log(searchQuery, search);
  return (
    <Layout>
      <SearchBar queryObj={queryObj} keyword={search} filters={true} />
      <h1>Search :D of {search}</h1>

      <SearchResults searched={searchQuery} />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context.query?.search?.category, "in the server response");
  const { search } = context.query;
  const queryObj = context.query;
  const { data: searchQuery } = await axios.get(
    HOST_SV + "/api/articles/search/" + context.query.search,
    {
      params: {
        category: context.query?.category,
        min_price: context.query?.min_price,
        max_price: context.query?.max_price,
        location: context.query?.location,
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
