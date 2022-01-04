import * as trpc from "@trpc/server";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

export const appRouter = trpc.router().query("get-pokemon-by-id", {
  input: z.object({ id: z.number().positive() }).nullish(),
  async resolve({ input }) {
    const pokemonClient = new PokemonClient();
    let pokemon = await pokemonClient.getPokemonById(input.id);
    return {
      name: pokemon.name,
      sprites: pokemon.sprites,
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
