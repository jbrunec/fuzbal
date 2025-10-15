import AttDefPieChart from "@/components/att-def-pie-chart";
import EloHistoryLineChart from "@/components/elo-history-line-chart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { Circle } from "lucide-react";
import dayjs from "dayjs";

type AdditionalInfoDialogProps = {
  playerId: Id<"players">;
  asAtt: number;
  asDef: number;
};

const data = [
  { dateString: "date 1", rating: 1500 },
  { dateString: "date 2", rating: 1532 },
  { dateString: "date 3", rating: 1502 },
  { dateString: "date 4", rating: 1487 },
  { dateString: "date 5", rating: 1499 },
];

export default function AdditionalInfoDialog({
  playerId,
  asAtt,
  asDef,
}: AdditionalInfoDialogProps) {
  const { data } = useSuspenseQuery(
    convexQuery(api.eloHistories.getEloRatingsByPlayer, { playerId: playerId })
  );
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Stats</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Additional Stats</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[250px_50px] sm:gap-x-4">
            <div className="flex gap-2">
              <Circle fill="#FF8042" />
              <label>Positions as attacker:</label>
            </div>
            <div>{asAtt}</div>
            <div className="flex gap-2">
              <Circle fill="#0088FE" />
              <label>Positions as defender:</label>
            </div>
            <div className="">{asDef}</div>
          </div>
          <div className="w-full h-50">
            <AttDefPieChart
              data={[
                { name: "Attack", value: asAtt },
                { name: "Defense", value: asDef },
              ]}
            />
          </div>
          <div className="w-full h-50">
            <EloHistoryLineChart
              data={data.map((point) => ({
                ...point,
                _creationTime: dayjs(point._creationTime).format("DD/MM h:mm"),
              }))}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
