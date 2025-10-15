import { playerSchema } from "@/schemas";
import { Doc, Id } from "convex/_generated/dataModel";
import z from "zod";

export type Player = {
  _id: Id<"players">;
  name: string;
  games: number;
  wins: number;
  goalsGivenAsDefender: number;
  goalsGivenAsAttacker: number;
  goalsReceivedAsDefender: number;
  winPercentage: number;
  rating: number;
  streak: number;
  asAtt: number;
  asDef: number;
  lastPlayed?: number;
};

export type AddPlayerStatisticsFormData = z.infer<typeof playerSchema>;
export type Match = Doc<"matches">;
export type MatchWithNames = Pick<
  Match,
  "_id" | "_creationTime" | "blueScore" | "redScore"
> & {
  redAttacker: string;
  redDefender: string;
  blueAttacker: string;
  blueDefender: String;
};

export type PlayerModel = Doc<"players">;
