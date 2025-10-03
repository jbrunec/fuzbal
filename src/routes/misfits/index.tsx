import { AddStatisticsBtn } from "@/components/add-statistics-btn";
import { MatchesTable } from "@/components/table/matches-table";
import { PlayersTable } from "@/components/table/players-table";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/misfits/")({
  component: RouteComponent,
  pendingComponent: () => <>Loading!</>,
  errorComponent: () => <>ERROR</>,
  notFoundComponent: () => <>not found</>,
  loader: async ({ params, context: { QueryClient } }) => {
    await QueryClient.ensureQueryData(convexQuery(api.players.getPlayers, {}));
  },
});

function RouteComponent() {
  const { data } = useSuspenseQuery(convexQuery(api.players.getPlayers, {}));
  const { data: results } = useSuspenseQuery(
    convexQuery(api.matches.getMatches, {})
  );
  return (
    <main className="flex flex-col">
      <h1 className="text-center text-4xl font-bold">Fuzbal</h1>
      <section className="flex flex-col gap-4 sm:max-w-6xl sm:mx-auto sm:items-center sm:justify-center mt-10">
        <AddStatisticsBtn />
        <PlayersTable data={data} />
        {/* <Button variant={"destructive"} onClick={async () => mutate({})}>
      Do not click!
    </Button> */}
        <MatchesTable data={results} />
      </section>
    </main>
  );
}
