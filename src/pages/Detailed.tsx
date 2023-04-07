import { FC, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from "axios";

import { typePokeDetailed } from "@/utils/types/cardpoke";
import { ButtonRed } from "@/components/Button";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";
import Swal from "@/utils/swal";

interface PromiseType {
  data: string | null;
  message: string;
}

const Detailed: FC = () => {
  const [pokemonList, setPokemonList] = useState<typePokeDetailed>({
    name: "",
    image: "",
    type: "",
    typeTwo: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const params = useParams();
  const { name: named } = params;
  useTitle(`${named}`);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`pokemon/${named}`);

        const data = response.data;
        if (response.data.types.length === 1) {
          setPokemonList({
            name: data.name,
            type: data.types[0].type.name,
            image: data.sprites.front_default,
          });
        } else {
          setPokemonList({
            name: data.name,
            type: data.types[0].type.name,
            typeTwo: data.types[1].type.name,
            image: data.sprites.front_default,
          });
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  const toLocalStorage = (text: string) => {
    localStorage.setItem("myText", text);
  };

  function handleGacha() {
    const gachapon = new Promise<PromiseType>((resolve, reject) => {
      let rate = Math.random() * 100;
      setTimeout(() => {
        if (rate > 80) {
          resolve({
            data: "SSR",
            message: `you get ${pokemonList.name}`,
          });
        } else {
          reject({
            data: null,
            message: `${pokemonList.name} flew Away`,
          });
        }
      }, 1000);
    });

    const tryCatch = async () => {
      try {
        let result = await gachapon;
        MySwal.fire({
          title: "Congratz",
          text: result.message,
          icon: "success",
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            MySwal.fire({
              title: "Give Name",
              input: "text",
              inputLabel: `${pokemonList.name}`,
              inputPlaceholder: "Your Pokemon Name",
            });
            navigate("/MyPoke");
          }
        });
      } catch (error: any) {
        MySwal.fire({
          title: "so sad",
          text: error.message,
          showCancelButton: false,
          icon: "error",
        });
      }
    };
    tryCatch();
  }

  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-5 mb-7 w-[70%]">
          <img
            src={pokemonList.image}
            alt={`${pokemonList.name}'s profile picture `}
            className="w-72 h-auto rounded-full"
            id="image-detail"
          />

          <div className="text-center">
            <p className="text-slate-900 dark:text-slate-200 font-semibold tracking-widest uppercase">
              {pokemonList.name}
            </p>
            <p className="text-slate-900 dark:text-slate-200 tracking-wide">
              {pokemonList.type} {pokemonList.typeTwo}
            </p>
          </div>
          <div className="w-56 bg-slate-900">
            <ButtonRed
              label="TRY CATCH"
              id="button-gacha"
              onClick={() => handleGacha()}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detailed;
