import { AddPlayerStatisticsFormData, Match, Player } from "@/types";
import { Id } from "convex/_generated/dataModel";
import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { internal } from "convex/_generated/api";

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

export const updateStatistics = internalMutation({
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
  return false;
}

export const updateRating = internalMutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const K = 32; // adjustment factor (common values: 16, 24, 32; higher means faster rating changes)
    const redAttacker: Player = await ctx.db.get(
      args.teamRed.attacker as Id<"players">
    );
    const redDefender: Player = await ctx.db.get(
      args.teamRed.defender as Id<"players">
    );
    const blueAttacker: Player = await ctx.db.get(
      args.teamBlue.attacker as Id<"players">
    );
    const blueDefender: Player = await ctx.db.get(
      args.teamBlue.defender as Id<"players">
    );

    const redTeamRating = (redAttacker.rating + redDefender.rating) / 2;
    const blueTeamRating = (blueAttacker.rating + blueDefender.rating) / 2;

    const expectedRatingRed =
      1 / (1 + 10 ** ((blueTeamRating - redTeamRating) / 400));
    const expectedRatingBlue = 1 - expectedRatingRed;

    const actualRed = args.teamRed.goals > args.teamBlue.goals ? 1 : 0;
    const actualBlue = 1 - actualRed;

    const deltaRed = K * (actualRed - expectedRatingRed);
    const deltaBlue = K * (actualBlue - expectedRatingBlue);

    redAttacker.rating += deltaRed;
    redDefender.rating += deltaRed;
    blueAttacker.rating += deltaBlue;
    blueDefender.rating += deltaBlue;

    await Promise.all(
      [redAttacker, redDefender, blueAttacker, blueDefender].map(
        async (p: Player) => await ctx.db.patch(p._id, { rating: p.rating })
      )
    );
  },
});

export const testUpdateRating = mutation({
  args: {},
  handler: async (ctx) => {
    const allMatches: Match[] = await ctx.db.query("matches").collect();
    for (const match of allMatches) {
      await ctx.runMutation(internal.players.updateRating, {
        teamRed: {
          attacker: match.redAttacker,
          defender: match.redDefender,
          goals: match.redScore,
        },
        teamBlue: {
          attacker: match.blueAttacker,
          defender: match.blueDefender,
          goals: match.blueScore,
        },
      });
    }
  },
});
