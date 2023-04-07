import { FC, useState, useEffect } from "react";
import axios from "axios";

import { pokepage } from "@/utils/types/cardpoke";
import { Spinner } from "@/components/Loading";
import { Button } from "@/components/Button";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";
import Card from "@/components/Card";

const Home: FC = () => {
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

  useEffect(() => {
    const fetchAwait = () => {
      fetchDeconstruct("/pokemon");
    };

    fetchAwait();
  }, []);

  const handleNextClick = () => {
    fetchDeconstruct(nextPageUrl);
  };

  const handlePrevClick = () => {
    fetchDeconstruct(prevPageUrl);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4">
        <p
          className=" text-xl text-slate-900 dark:text-slate-200 font-bold tracking-wider "
          id="mainpage"
        >
          Pokemon List:
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
        <div className="flex gap-3 w-full">
          <Button
            label="Prev"
            id="button-prev"
            disabled={!prevPageUrl}
            onClick={handlePrevClick}
          />
          <Button
            label="Next"
            id="button-next"
            disabled={!nextPageUrl}
            onClick={handleNextClick}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
