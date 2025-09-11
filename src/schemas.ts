import z from "zod";

export const playerSchema = z.object({
  teamRed: z.object({
    attacker: z.string().min(1, "Attacker is required"),
    defender: z.string().min(1, "Defender is required"),
    goals: z.number().min(0),
  }),
  teamBlue: z.object({
    attacker: z.string().min(1, "Attacker is required"),
    defender: z.string().min(1, "Defender is required"),
    goals: z.number().min(0),
  }),
});
