import Header from "@/components/Header";
import {
  AddCountryMutation,
  AddCountryMutationVariables,
  GetAllCountriesQuery,
} from "@/graphql/generated/schema";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      name
      emoji
      id
      code
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      emoji
      id
      name
    }
  }
`;

export default function Home() {
  const { data, refetch } = useQuery<GetAllCountriesQuery>(GET_ALL_COUNTRIES);

  const [formData, setFormData] = useState<AddCountryMutationVariables>({
    data: {
      code: "",
      emoji: "",
      name: "",
    },
  });

  const updateFormData = (
    partialFormData: Partial<AddCountryMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createAdMutation, { loading, error }] = useMutation<
    AddCountryMutation,
    AddCountryMutationVariables
  >(ADD_COUNTRY, {
    onCompleted: () => {
      refetch();
    },
  });

  const addCountry = async () => {
    try {
      await createAdMutation({
        variables: {
          ...formData,
        },
      });
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de l'ajout du pays.");
      console.error(
        "Une erreur s'est produite lors de l'ajout du pays.",
        error
      );
    }
  };

  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <>
      <Header />

      <form
        id="CountryForm"
        onSubmit={(event) => {
          event.preventDefault();
          addCountry();
        }}
        className="flex mx-[7rem] mt-[7rem] mb-[3rem] formCard"
      >
        <div className="flex flex-col items-center mr-[5rem]">
          <label
            className="w-full mb-[0.2rem] mt-[0.5rem]"
            htmlFor="name"
            placeholder="Nom du pays"
          >
            Name:
          </label>
          <input
            className="rounded px-2 h-8 border-solid border-[1px] border-blue-800 opacity-50 mb-[0.5rem]"
            type="text"
            id="name"
            name="name"
            placeholder="Country's name"
            minLength={2}
            maxLength={50}
            required
            onChange={(event) => {
              updateFormData({
                data: { ...formData.data, name: event.target.value },
              });
            }}
          />
        </div>

        <div className="flex flex-col items-center mr-[5rem]">
          <label className="w-full mb-[0.2rem] mt-[0.5rem]" htmlFor="emoji">
            Emoji:
          </label>
          <input
            className="rounded px-2 h-8 border-solid border-[1px] border-blue-800 opacity-50 mb-[0.5rem]"
            type="text"
            id="emoji"
            name="emoji"
            placeholder="Country's emoji"
            required
            onChange={(event) => {
              updateFormData({
                data: { ...formData.data, emoji: event.target.value },
              });
            }}
          />
        </div>

        <div className="flex flex-col items-center mr-[3rem]">
          <label className="w-full mb-[0.2rem] mt-[0.5rem]" htmlFor="code">
            Code:
          </label>
          <input
            className="rounded px-2 h-8 border-solid border-[1px] border-blue-800 opacity-50 mb-[0.5rem]"
            type="text"
            id="code"
            name="code"
            placeholder="Country's code"
            minLength={2}
            maxLength={50}
            required
            onChange={(event) => {
              updateFormData({
                data: { ...formData.data, code: event.target.value },
              });
            }}
          />
        </div>

        <button type="submit" className="addBtn my-[0.5rem]">
          Add
        </button>
        {errorMessage && (
          <p className="flex items-center ml-[1rem]">{errorMessage}</p>
        )}
      </form>

      <div className="flex flex-wrap justify-around mx-[2rem]">
        {data?.countries ? (
          data.countries.map((country) => (
            <Link
              key={country.id}
              href={`/countries/${country.code}`}
              className="countryCard"
            >
              <div>{country.name}</div>
              <div>{country.emoji}</div>
            </Link>
          ))
        ) : (
          <p>Chargement en cours</p>
        )}
      </div>
    </>
  );
}
