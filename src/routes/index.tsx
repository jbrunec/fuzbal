import { AddStatisticsBtn } from "@/components/add-statistics-btn";
import { MatchesTable } from "@/components/table/matches-table";
import { PlayersTable } from "@/components/table/players-table";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/")({
  component: App,
  pendingComponent: () => <>Loading!</>,
  errorComponent: () => <>ERROR</>,
  notFoundComponent: () => <>not found</>,
  loader: async ({ params, context: { QueryClient } }) => {
    await QueryClient.ensureQueryData(convexQuery(api.players.getPlayers, {}));
  },
});

function App() {
  const { data } = useSuspenseQuery(convexQuery(api.players.getPlayers, {}));
  const { data: matches } = useSuspenseQuery(
    convexQuery(api.matches.getMatches, {})
  );

  return (
    <main className="flex flex-col p-0 sm:p-6 min-h-screen dark:bg-gradient-to-r dark:from-[#1b2641]  dark:to-[#56606e] dark:text-white">
      <h1 className="text-center text-4xl font-bold">Fuzbal</h1>
      <section className="flex flex-col gap-4 sm:max-w-6xl sm:mx-auto sm:items-center sm:justify-center mt-10">
        <AddStatisticsBtn />
        <PlayersTable data={data} />
        <MatchesTable data={matches} />
      </section>
    </main>
  );
}
