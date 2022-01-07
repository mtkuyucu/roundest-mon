import { PokemonClient } from "pokenode-ts";
import { prisma } from "../src/backend/utils/prisma";

const doBackFill = async () => {
  const pokeApi = new PokemonClient();
  const allPokemon = await pokeApi.listPokemons(0, 493);

  const formattedPokemon = allPokemon.results.map((pokemon, index) => {
    return {
      id: index + 1,
      name: (pokemon as { name: string }).name,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,
    };
  });
  console.log(allPokemon);
  const createdPokemons = await prisma.pokemon.createMany({
    data: formattedPokemon,
  });
  console.log("Pokemens were created successfully", createdPokemons);
};

doBackFill();
