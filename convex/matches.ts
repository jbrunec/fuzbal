import { Match } from "@/types";
import { api, internal } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { mutation, query } from "convex/_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const getMatches = query({
  args: {},
  handler: async (ctx): Promise<Match[]> => {
    const players = await ctx.runQuery(api.players.getPlayers);
    const playersMap = players.reduce((map, player) => {
      map[player._id] = player.name;
      return map;
    }, {} as Record<string, string>);
    const matches = (await ctx.db
      .query("matches")
      .order("desc")
      .collect()) as Match[];

    matches.map((m) => {
      m.blueAttacker = playersMap[m.blueAttacker];
      m.blueDefender = playersMap[m.blueDefender];
      m.redAttacker = playersMap[m.redAttacker];
      m.redDefender = playersMap[m.redDefender];
    });

    return matches;
  },
});

// export const getMatchesPaginated = query({
//   args: { paginationOpts: paginationOptsValidator, pageSize: v.number() },
//   handler: async (ctx, args) => {
//     const players = await ctx.runQuery(api.players.getPlayers);
//     const playersMap = players.reduce((map, player) => {
//       map[player._id] = player.name;
//       return map;
//     }, {} as Record<string, string>);
//     console.log("pagination OPTS: ", args.paginationOpts);
//     const matches = await ctx.db
//       .query("matches")
//       .order("desc")
//       .paginate(args.paginationOpts);

//     matches.page.map((m) => {
//       m.blueAttacker = playersMap[m.blueAttacker];
//       m.blueDefender = playersMap[m.blueDefender];
//       m.redAttacker = playersMap[m.redAttacker];
//       m.redDefender = playersMap[m.redDefender];
//     });

//     return matches;
//   },
// });

export const postMatch = mutation({
  args: {
    redAttacker: v.string(),
    redDefender: v.string(),
    redScore: v.number(),
    blueAttacker: v.string(),
    blueDefender: v.string(),
    blueScore: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.players.updateStatistics, {
      data: {
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
      },
    }),
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
      }),
      await ctx.db.insert("matches", {
        redAttacker: args.redAttacker as Id<"players">,
        redDefender: args.redDefender as Id<"players">,
        redScore: args.redScore,
        blueAttacker: args.blueAttacker as Id<"players">,
        blueDefender: args.blueDefender as Id<"players">,
        blueScore: args.blueScore,
      });
  },
});
