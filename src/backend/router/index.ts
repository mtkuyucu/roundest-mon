import * as trpc from "@trpc/server";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

export const appRouter = trpc.router().query("get-pokemon-by-id", {
  input: z.object({ id: z.number().positive() }).nullish(),
  resolve: async function ({ input }) {
    const pokemonClient = new PokemonClient();
    return pokemonClient.getPokemonById(input.id);
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
