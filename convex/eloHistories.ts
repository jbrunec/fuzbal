import { PlayerModel } from "@/types";
import { MutationCtx, query } from "convex/_generated/server";
import { v } from "convex/values";

export const getEloRatingsByPlayer = query({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("eloHistories")
      .withIndex("by_player_id", (q) => q.eq("playerId", args.playerId))
      .order("desc")
      .take(20);
    return res.reverse();
  },
});

export async function archiveEloRatings(
  players: PlayerModel[],
  ctx: MutationCtx
) {
  console.log("Archiving elo ratings...");
  for (const player of players) {
    await ctx.db.insert("eloHistories", {
      playerId: player._id,
      rating: player.rating,
      date: Date.now(),
    });
  }
}
