import { GetServerSideProps, GetStaticProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";
import React from "react";
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

type PokemonQueryResult = AsyncReturnType<typeof getPokemonOrder>;

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number] }> = ({
  pokemon,
}) => {
  return (
    <div className="flex border-b p-2 justify-between items-center">
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
      <div className="text-sm pr-2">{generatePercentage(pokemon) + "%"}</div>
    </div>
  );
};

const ResultsPage: React.FC<{
  pokemonList: AsyncReturnType<typeof getPokemonOrder>;
}> = ({ pokemonList }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl p-4">Result Page</h2>
      <div className="flex flex-col w-full max-w-xl border">
        {pokemonList.map((pokemon, index) => {
          return <PokemonListing pokemon={pokemon} key={index} />;
        })}
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
