import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export function useUpdateStatisticsMutation() {
  console.log("inside useUpdateStatisticsMutation ");
  const mutationFn = useConvexMutation(api.matches.postMatch);
  return useMutation({ mutationFn });
}

export function useRegenerateElo() {
  const mutationFn = useConvexMutation(api.players.testUpdateRating);
  return useMutation({ mutationFn });
}
