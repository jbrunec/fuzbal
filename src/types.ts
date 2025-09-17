import { playerSchema } from "@/schemas";
import { Id } from "convex/_generated/dataModel";
import z from "zod";

export type Player = {
  _id: Id<string>;
  name: string;
  games: number;
  wins: number;
  goalsGivenAsDefender: number;
  goalsGivenAsAttacker: number;
  goalsReceivedAsDefender: number;
  winPercentage: number;
};

export type AddPlayerStatisticsFormData = z.infer<typeof playerSchema>;
