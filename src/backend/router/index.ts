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
        return await prisma.pokemon.findFirst({
          where: { id: input.id },
        });
      }
      return {
        name: "Missing ID",
        spriteUrl: "https://i.imgur.com/Z6X8QZ8.png",
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
          votedForId: input.voteFor,
          votedAgainstId: input.voteAgainst,
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
