import * as trpc from "@trpc/server";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({ id: z.number().positive() }).nullish(),
    async resolve({ input }) {
      if (input) {
        let pokemon = await prisma.pokemon.findFirst({
          where: { id: input.id },
        });
        if (pokemon) {
          return {
            name: pokemon.name,
            sprites: pokemon.sprites,
          };
        }
      }
      return {
        name: "Missing ID",
        sprites: {
          front_default: "https://i.imgur.com/Z6X8QZ8.png",
        },
      };
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      voteFor: z.number().positive(),
      voteAgainst: z.number().positive(),
    }),
    async resolve({ input }) {
      const voteInDb = prisma.vote.create({
        data: {
          voteFor: input.voteFor,
          voteAgainst: input.voteAgainst,
        },
      });

      return {
        success: true,
        ...voteInDb,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
