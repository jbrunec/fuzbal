import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddPlayerStatisticsForm } from "@/components/player-statistics-form";
import { useState } from "react";

export function AddStatisticsBtn() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-accent hover:text-accent-foreground cursor-pointer">
          Add Match
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Match</DialogTitle>
        </DialogHeader>
        <AddPlayerStatisticsForm
          onCancel={() => setOpen(false)}
          onSubmit={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
