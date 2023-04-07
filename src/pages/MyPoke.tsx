import { FC, useState } from "react";
import axios from "axios";

import { pokepage } from "@/utils/types/cardpoke";
import { Spinner } from "@/components/Loading";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";
import Card from "@/components/Card";

const MyPoke: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<pokepage[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [prevPageUrl, setPrevPageUrl] = useState<string>("");
  useTitle("Pokemon App");

  const fetchDeconstruct = async (axiosCode: string) => {
    setLoading(true);
    const result = await axios.get(axiosCode);
    setPokemonList(
      result.data.results.map((result: any) => ({
        name: result.name,
        url: result.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          result.url.split("/")[6]
        }.png`,
      }))
    );
    setNextPageUrl(result.data.next);
    setPrevPageUrl(result.data.previous);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4">
        <p
          className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wider "
          id="mainpage"
        >
          My Own Pokemon:
        </p>
        <div className="gap-2 grid grid-cols-2 w-full">
          {loading ? (
            <Spinner />
          ) : (
            pokemonList.map((p: pokepage, idx) => (
              <Card key={idx} name={p.name} image={p.image} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyPoke;
