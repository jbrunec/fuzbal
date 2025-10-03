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
  handler: async (ctx, args): Promise<Player | null> => {
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
    const matchDate = Date.now();
    const player1: Player | null = await ctx.db.get(
      args.data.teamRed.attacker as Id<"players">
    );
    if (!player1) return;
    player1.games += 1;
    player1.wins += isWin("teamRed", args.data) ? 1 : 0;
    player1.winPercentage = (player1.wins / player1.games) * 100;
    player1.streak = calculateStreak(
      player1.streak,
      isWin("teamRed", args.data)
    );
    player1.lastPlayed = matchDate;

    const player2 = await ctx.db.get(
      args.data.teamRed.defender as Id<"players">
    );
    if (!player2) return;
    player2.games += 1;
    player2.wins += isWin("teamRed", args.data) ? 1 : 0;
    player2.winPercentage = (player2.wins / player2.games) * 100;
    player2.streak = calculateStreak(
      player2.streak,
      isWin("teamRed", args.data)
    );
    player2.lastPlayed = matchDate;

    const player3 = await ctx.db.get(
      args.data.teamBlue.attacker as Id<"players">
    );
    if (!player3) return;
    player3.games += 1;
    player3.wins += isWin("teamBlue", args.data) ? 1 : 0;
    player3.winPercentage = (player3.wins / player3.games) * 100;
    player3.streak = calculateStreak(
      player3.streak,
      isWin("teamBlue", args.data)
    );
    player3.lastPlayed = matchDate;

    const player4 = await ctx.db.get(
      args.data.teamBlue.defender as Id<"players">
    );
    if (!player4) return;
    player4.games += 1;
    player4.wins += isWin("teamBlue", args.data) ? 1 : 0;
    player4.winPercentage = (player4.wins / player4.games) * 100;
    player4.streak = calculateStreak(
      player4.streak,
      isWin("teamBlue", args.data)
    );
    player4.lastPlayed = matchDate;

    [player1, player2, player3, player4].forEach(async (p: Player) => {
      await ctx.db.patch(p._id, {
        games: p.games,
        wins: p.wins,
        winPercentage: +p.winPercentage.toFixed(2),
        streak: p.streak,
        lastPlayed: p.lastPlayed,
      });
    });
  },
});

function isWin(
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

function calculateStreak(currentStreak: number, isWin: boolean) {
  if (isWin) {
    if (currentStreak > 0) {
      return currentStreak + 1;
    }
    return 1;
  } else {
    if (currentStreak > 0) {
      return -1;
    }
    return currentStreak - 1;
  }
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
    const redAttacker: Player | null = await ctx.db.get(
      args.teamRed.attacker as Id<"players">
    );
    const redDefender: Player | null = await ctx.db.get(
      args.teamRed.defender as Id<"players">
    );
    const blueAttacker: Player | null = await ctx.db.get(
      args.teamBlue.attacker as Id<"players">
    );
    const blueDefender: Player | null = await ctx.db.get(
      args.teamBlue.defender as Id<"players">
    );

    if (!redAttacker) return;
    if (!redDefender) return;
    if (!blueAttacker) return;
    if (!blueDefender) return;

    // applyDecay(redAttacker);
    // applyDecay(redDefender);
    // applyDecay(blueAttacker);
    // applyDecay(blueDefender);

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

export const regenerateRating = internalMutation({
  args: {
    _id: v.id("matches"),
    redAttacker: v.string(),
    redDefender: v.string(),
    redScore: v.number(),
    blueAttacker: v.string(),
    blueDefender: v.string(),
    blueScore: v.number(),
    _creationTime: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.players.updateRating, {
      teamRed: {
        attacker: args.redAttacker,
        defender: args.redDefender,
        goals: args.redScore,
      },
      teamBlue: {
        attacker: args.blueAttacker,
        defender: args.blueDefender,
        goals: args.blueScore,
      },
    });
  },
});

export const regenerateStatistic = mutation({
  args: {},
  handler: async (ctx) => {
    const allMatches: Match[] = await ctx.db.query("matches").collect();
    const allPlayers: Player[] = await ctx.db.query("players").collect();

    for (const player of allPlayers) {
      await ctx.db.patch(player._id, {
        rating: 1500,
        games: 0,
        wins: 0,
        winPercentage: 0,
        streak: 0,
        lastPlayed: Date.now(),
      });
    }

    for (const match of allMatches) {
      await ctx.runMutation(internal.players.updateStatistics, {
        data: {
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
        },
      });
      await ctx.runMutation(internal.players.regenerateRating, match);
    }
  },
});

function applyDecay(player: Player, decayPercent = 0.02) {
  if (!player.lastPlayed) return;

  const weeksInactive = Math.floor(Date.now() - player.lastPlayed);
  if (weeksInactive > 0) {
    console.log(
      "decay update: ",
      player.rating * Math.pow(1 - decayPercent, weeksInactive)
    );
    // player.rating = player.rating * Math.pow(1 - decayPercent, weeksInactive);
  }
}
