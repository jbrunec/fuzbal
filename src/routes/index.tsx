import { AddStatisticsBtn } from "@/components/add-statistics-btn";
import { PlayersTable } from "@/components/table/players-table";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";

export const Route = createFileRoute("/")({
  component: App,
  pendingComponent: () => <>Loading!</>,
  errorComponent: () => <>ERROR</>,
  notFoundComponent: () => <>not found</>,
  loader: async ({ params, context: { QueryClient } }) => {
    await QueryClient.ensureQueryData(convexQuery(api.players.getPlayers, {}));
  },
});

export type Player = {
  _id: Id<string>;
  name: string;
  games: number;
  wins: number;
  goalsGiven: number;
  goalsReceived: number;
  winPercentage: number;
};

function App() {
  const { data } = useSuspenseQuery(convexQuery(api.players.getPlayers, {}));

  return (
    <main className="flex flex-col  h-screen dark:bg-gradient-to-r dark:from-[#1b2641]  dark:to-[#56606e] dark:text-white">
      <h1 className="text-center text-4xl font-bold">Fuzbal</h1>
      <section className="flex flex-col gap-4 items-center justify-center mt-10">
        <AddStatisticsBtn />
        <PlayersTable data={data} />
      </section>
    </main>
  );
}
