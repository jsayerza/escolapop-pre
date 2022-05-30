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
      <h1 className="font-semibold text-3xl p-4">
        Resultats de cerca de {`'${search}'`}
      </h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <SearchResults searched={searchQuery} />
      </div>
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
        size: context.query?.size,
        min_price: 0,
        max_price: 999999,
        location: context.query?.location,
        course: context.query?.course,
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
