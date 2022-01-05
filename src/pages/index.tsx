import { NextPage } from "next";
import { getOptionsForVote } from "@/utils/getRandomPokemen";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";

const BUTTON_CLASS =
  "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm rounded text-sm leading-5 font-medium text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 focus:z-10 transition duration-150 ease-in-out";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (
    !firstPokemon?.data ||
    !secondPokemon?.data ||
    firstPokemon.isLoading ||
    secondPokemon.isLoading
  ) {
    return <div>Loading...</div>;
  }

  const voteForRoundest = (selected: number) => {
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is roundest ?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col items-center justify-around">
          {firstPokemon.data.sprites.front_default && (
            <img
              className="w-full h-full"
              src={firstPokemon.data.sprites.front_default}
              alt={firstPokemon.data.name}
            />
          )}
          <div className="text-xl text-center capitalize mt-[-1rem]">
            {firstPokemon.data?.name}
          </div>
          <div className="pt-2" />
          <button
            className={BUTTON_CLASS}
            onClick={() => voteForRoundest(first)}
          >
            Rounder
          </button>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col items-center justify-around">
          {secondPokemon.data.sprites.front_default && (
            <img
              className="w-full h-full"
              src={secondPokemon.data.sprites.front_default}
              alt={secondPokemon.data.name}
            />
          )}

          <div className="text-xl text-center capitalize mt-[-1rem]">
            {secondPokemon.data?.name}
          </div>
          <div className="pt-2" />
          <button
            className={BUTTON_CLASS}
            onClick={() => voteForRoundest(second)}
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
