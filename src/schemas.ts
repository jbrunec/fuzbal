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

export const matchSchema = z.object({
  redAttacker: z.string().min(1, "Attacker is required"),
  redDefender: z.string().min(1, "Defender is required"),
  redScore: z.number().min(0),
  blueAttacker: z.string().min(1, "Attacker is required"),
  blueDefender: z.string().min(1, "Defender is required"),
  blueScore: z.number().min(0),
  _creationTime: z.number().optional(),
});
