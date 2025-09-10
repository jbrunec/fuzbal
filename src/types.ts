export type Player = {
  name: string;
  games: number;
  wins: number;
  goalsGiven: number;
  goalsReceived: number;
  winPercentage: number;
};

export type AddPlayerStatisticsFormData = {
  teamRed: {
    attacker: string;
    defender: string;
    goals: number;
  };
  teamBlue: {
    attacker: string;
    defender: string;
    goals: number;
  };
};
