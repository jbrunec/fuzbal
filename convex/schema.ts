import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  matches: defineTable({
    blueAttacker: v.id("players"),
    blueDefender: v.id("players"),
    blueScore: v.float64(),
    redAttacker: v.id("players"),
    redDefender: v.id("players"),
    redScore: v.float64(),
  }),
  players: defineTable({
    games: v.float64(),
    goalsGivenAsAttacker: v.float64(),
    goalsGivenAsDefender: v.float64(),
    goalsReceivedAsDefender: v.float64(),
    name: v.string(),
    rating: v.float64(),
    streak: v.float64(),
    winPercentage: v.float64(),
    wins: v.float64(),
    asAtt: v.optional(v.float64()),
    asDef: v.optional(v.float64()),
    lastPlayed: v.float64(),
  }),
  eloHistories: defineTable({
    playerId: v.id("players"),
    date: v.float64(),
    rating: v.float64(),
  }).index("by_player_id", ["playerId", "date"]),
});
