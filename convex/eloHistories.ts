import { PlayerModel } from "@/types";
import { MutationCtx } from "convex/_generated/server";

// export const archiveEloRatings = internalMutation({
//   args: {
//     players: v.array(v.object({ id: v.id("players"), rating: v.number() })),
//   },
//   handler: async (ctx, args) => {
//     for (const player of args.players) {
//       await ctx.db.insert("eloHistories", {
//         playerId: player.id,
//         rating: player.rating,
//         date: Date.now(),
//       });
//     }
//   },
// });

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
