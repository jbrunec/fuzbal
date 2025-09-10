import { Player } from "@/routes";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "convex/_generated/dataModel";
import { AddPlayerStatisticsFormData } from "@/types";

export const getPlayers = query({
  args: {},
  handler: async (ctx): Promise<Player[]> => {
    return await ctx.db.query("players").collect();
  },
});

export const getPlayer = query({
  args: {
    id: v.id("players"),
  },
  handler: async (ctx, args): Promise<Player> => {
    return await ctx.db.get(args.id);
  },
});

export const updateStatistics = mutation({
  args: {
    data: v.object({
      teamRed: v.object({
        attacker: v.string(),
        defender: v.string(),
        goals: v.number(),
      }),
      teamBlue: v.object({
        attacker: v.string(),
        defender: v.string(),
        goals: v.number(),
      }),
    }),
  },
  handler: async (ctx, args) => {
    console.log("inside Mutation: ", args);
    const player1: Player = await ctx.db.get(
      args.data.teamRed.attacker as Id<"players">
    );
    player1.games += 1;
    player1.wins += hasWon("teamRed", args.data) ? 1 : 0;
    player1.winPercentage = (player1.wins / player1.games) * 100;

    const player2 = await ctx.db.get(
      args.data.teamRed.defender as Id<"players">
    );
    player2.games += 1;
    player2.wins += hasWon("teamRed", args.data) ? 1 : 0;
    player2.winPercentage = (player2.wins / player2.games) * 100;

    const player3 = await ctx.db.get(
      args.data.teamBlue.attacker as Id<"players">
    );
    player3.games += 1;
    player3.wins += hasWon("teamBlue", args.data) ? 1 : 0;
    player3.winPercentage = (player3.wins / player3.games) * 100;

    const player4 = await ctx.db.get(
      args.data.teamBlue.defender as Id<"players">
    );
    player4.games += 1;
    player4.wins += hasWon("teamBlue", args.data) ? 1 : 0;
    player4.winPercentage = (player4.wins / player4.games) * 100;

    [player1, player2, player3, player4].forEach(async (p: Player) => {
      await ctx.db.patch(p._id, {
        games: p.games,
        wins: p.wins,
        winPercentage: +p.winPercentage.toFixed(2),
      });
    });
  },
});

function hasWon(
  team: "teamRed" | "teamBlue",
  gameData: AddPlayerStatisticsFormData
) {
  if (team === "teamRed") {
    return gameData[team].goals > gameData["teamBlue"].goals;
  }
  if (team === "teamBlue") {
    return gameData[team].goals > gameData["teamRed"].goals;
  }
}
