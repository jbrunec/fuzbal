import { playerSchema } from "@/schemas";
import { Id } from "convex/_generated/dataModel";
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
};

export type AddPlayerStatisticsFormData = z.infer<typeof playerSchema>;
export type Match = {
  _id: Id<"matches">;
  redAttacker: string;
  redDefender: string;
  redScore: number;
  blueAttacker: string;
  blueDefender: string;
  blueScore: number;
  _creationTime: number;
};
