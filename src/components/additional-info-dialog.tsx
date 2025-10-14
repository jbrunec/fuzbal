import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AdditionalInfoDialogProps = {
  asAtt: number;
  asDef: number;
};

export default function AdditionalInfoDialog({
  asAtt,
  asDef,
}: AdditionalInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Stats</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Additional Stats</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[250px_50px] gap-x-4">
          <div>Positions as attacker:</div>
          <div>{asAtt}</div>
          <div>Positions as defender:</div>
          <div className="">{asDef}</div>

          {/* {row.getValue("asAtt")}, as defender:{" "} */}
          {/* {row.getValue("asDef")} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
