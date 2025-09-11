import { playerSchema } from "@/schemas";
import z from "zod";

export type Player = {
  name: string;
  games: number;
  wins: number;
  goalsGiven: number;
  goalsReceived: number;
  winPercentage: number;
};

export type AddPlayerStatisticsFormData = z.infer<typeof playerSchema>;
