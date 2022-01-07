import { NextPage } from "next";
import { getOptionsForVote } from "@/utils/getRandomPokemen";
import { useEffect, useState } from "react";
import type React from "react";
import { trpc } from "@/utils/trpc";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import Image from "next/image";
import Link from "next/link";

const BUTTON_CLASS =
  "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm rounded text-sm leading-5 font-medium text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 focus:z-10 transition duration-150 ease-in-out";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);
  const voteMutation = trpc.useMutation(["cast-vote"]);

  if (
    !firstPokemon?.data ||
    !secondPokemon?.data ||
    firstPokemon.isLoading ||
    secondPokemon.isLoading
  ) {
    return <div>Loading...</div>;
  }

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ voteFor: first, voteAgainst: second });
    } else {
      voteMutation.mutate({ voteFor: second, voteAgainst: first });
    }
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is roundest ?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <PokemonListing
          pokemon={firstPokemon.data}
          vote={() => voteForRoundest(first)}
        />
        <div className="p-8">Vs</div>
        <PokemonListing
          pokemon={secondPokemon.data}
          vote={() => voteForRoundest(second)}
        />
      </div>
      <div className="absolute bottom-0 pb-2 text-xl text-center">
        <a href="https://github.com">Github </a>
        {"|"}
        <Link href="/results">
          <a> Results</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  if (!props.pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-64 h-64 flex flex-col items-center justify-around">
      {props.pokemon.spriteUrl && (
        <Image
          width={256}
          height={256}
          layout={"fixed"}
          src={props.pokemon.spriteUrl}
          alt={props.pokemon.name}
        />
      )}
      <div className="text-xl text-center capitalize mt-[-1rem]">
        {props.pokemon.name}
      </div>
      <div className="pt-2" />
      <button className={BUTTON_CLASS} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
