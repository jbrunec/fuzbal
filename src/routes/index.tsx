import { AddStatisticsBtn } from "@/components/add-statistics-btn";
import { PlayersTable } from "@/components/table/players-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

export type Player = {
  name: string;
  games: number;
  wins: number;
  goalsGiven: number;
  goalsReceived: number;
  winPercentage: number;
};

const mockData: Player[] = [
  {
    name: "Arsenal",
    games: 38,
    wins: 28,
    goalsGiven: 91,
    goalsReceived: 29,
    winPercentage: 73.7,
  },
  {
    name: "Manchester City",
    games: 38,
    wins: 26,
    goalsGiven: 89,
    goalsReceived: 31,
    winPercentage: 68.4,
  },
  {
    name: "Liverpool",
    games: 38,
    wins: 24,
    goalsGiven: 86,
    goalsReceived: 41,
    winPercentage: 63.2,
  },
  {
    name: "Chelsea",
    games: 38,
    wins: 21,
    goalsGiven: 77,
    goalsReceived: 47,
    winPercentage: 55.3,
  },
  {
    name: "Newcastle",
    games: 38,
    wins: 19,
    goalsGiven: 68,
    goalsReceived: 56,
    winPercentage: 50.0,
  },
  {
    name: "Brighton",
    games: 38,
    wins: 18,
    goalsGiven: 72,
    goalsReceived: 53,
    winPercentage: 47.4,
  },
  {
    name: "West Ham",
    games: 38,
    wins: 14,
    goalsGiven: 42,
    goalsReceived: 58,
    winPercentage: 36.8,
  },
  {
    name: "Tottenham",
    games: 38,
    wins: 18,
    goalsGiven: 66,
    goalsReceived: 40,
    winPercentage: 47.4,
  },
];

function App() {
  return (
    <main className="flex flex-col  h-screen dark:bg-gradient-to-r dark:from-[#1b2641]  dark:to-[#56606e] dark:text-white">
      <h1 className="text-center text-4xl font-bold">Fuzbal</h1>
      <section className="flex flex-col gap-4 items-center justify-center mt-10">
        <AddStatisticsBtn />
        <PlayersTable data={mockData} />
      </section>
    </main>
  );
}
