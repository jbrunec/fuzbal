import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export function useUpdateStatisticsMutation() {
  const mutationFn = useConvexMutation(api.matches.postMatch);
  return useMutation({ mutationFn });
}

// one off fallback function in case you mess up the data somehow
export function useRegeneratePlayerStatistic() {
  const mutationFn = useConvexMutation(api.players.regenerateStatistic);
  return useMutation({ mutationFn });
}
