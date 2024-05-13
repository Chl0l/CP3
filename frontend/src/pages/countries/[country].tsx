import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Header from "@/components/Header";

const GET_ONE_COUNTRY = gql`
  query getOneCountry($code: String!) {
    country(code: $code) {
      code
      emoji
      id
      name
      continent {
        name
        id
      }
    }
  }
`;

export default function Country() {
  const router = useRouter();
  const { country } = router.query;
  const { data } = useQuery(GET_ONE_COUNTRY, {
    variables: { code: country },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col h-100 items-center">
        {data?.country.emoji}
        <div className="flex flex-row">
          <h3 className="mr-[0.2rem]">Name:</h3> {data?.country.name} (
          {data?.country.code})
        </div>
        <div className="flex flex-row">
          <h3 className="mr-[0.2rem]">Continent:</h3>{" "}
          {data?.country.continent?.name ? (
            <span>{data?.country.continent?.name}</span>
          ) : (
            <span>Not mentioned</span>
          )}
        </div>
      </div>
    </>
  );
}
