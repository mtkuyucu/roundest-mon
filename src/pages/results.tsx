import { GetServerSideProps, GetStaticProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import PokemonDetailsModal from "@/components/pokemonDetailsModal";
import { AsyncReturnType } from "@/utils/ts-bs";
import React, { useState } from "react";
import Image from "next/image";

const getPokemonOrder = () => {
  return prisma.pokemon.findMany({
    orderBy: {
      votedFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          votedAgainst: true,
          votedFor: true,
        },
      },
    },
  });
};

const generatePercentage = (pokemon: PokemonQueryResult[number]): number => {
  const total = pokemon._count.votedFor + pokemon._count.votedAgainst;
  if (total === 0) return 0;
  return (pokemon._count.votedFor / total) * 100;
};

export type PokemonQueryResult = AsyncReturnType<typeof getPokemonOrder>;

const PokemonListing: React.FC<{
  pokemon: PokemonQueryResult[number];
  openPokemonDetail: (pokemon: PokemonQueryResult[number]) => void;
}> = ({ pokemon, openPokemonDetail }) => {
  return (
    <div className="flex justify-between border-b">
      <div className="flex items-center">
        <Image
          width={32}
          height={32}
          layout={"fixed"}
          src={pokemon.spriteUrl}
          alt={pokemon.name}
        />

        <div className="capitalize">{pokemon.name}</div>
      </div>
      <div className="text-sm pr-2 flex items-center">
        {generatePercentage(pokemon) + "%"}
        <button className="ml-2.5" onClick={() => openPokemonDetail(pokemon)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  pokemonList: AsyncReturnType<typeof getPokemonOrder>;
}> = ({ pokemonList }) => {
  const [modalPokemon, updateModalPokemon] = useState(pokemonList[0]);
  const [modalOpen, updateModalOpen] = useState(false);

  function openPokemonDetailModal(pokemon: PokemonQueryResult[number]) {
    updateModalPokemon(pokemon);
    updateModalOpen(true);
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl p-4">Result Page</h2>
      <div className="flex flex-col w-full max-w-xl border">
        {pokemonList.map((pokemon, index) => {
          return (
            <PokemonListing
              pokemon={pokemon}
              key={index}
              openPokemonDetail={() => openPokemonDetailModal(pokemon)}
            />
          );
        })}
        <PokemonDetailsModal
          open={modalOpen}
          pokemon={modalPokemon}
          onClose={() => updateModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
  const pokemonOrdered = await getPokemonOrder();

  return {
    props: {
      pokemonList: pokemonOrdered,
      revalidate: 30,
    },
  };
};
