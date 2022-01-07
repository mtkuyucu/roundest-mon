import { GetServerSideProps, GetStaticProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";
import React from "react";
import Image from "next/image";

const getPokemenOrder = () => {
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

type PokemonQueryResult = AsyncReturnType<typeof getPokemenOrder>;

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number] }> = (
  props
) => {
  return (
    <div className="flex border-b p-2 items-center">
      <Image
        width={32}
        height={32}
        layout={"fixed"}
        src={props.pokemon.spriteUrl}
        alt={props.pokemon.name}
      />

      <div className="capitalize">{props.pokemon.name}</div>
    </div>
  );
};

const ResultsPage: React.FC<{
  pokemonList: AsyncReturnType<typeof getPokemenOrder>;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl p-4">Result Page</h2>
      <div className="flex flex-col w-full max-w-xl border">
        {props.pokemonList.map((pokemon, index) => {
          return <PokemonListing pokemon={pokemon} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
  const pokemonOrdered = await getPokemenOrder();

  return {
    props: {
      pokemonList: pokemonOrdered,
      revalidate: 30,
    },
  };
};
