import { AddPlayerStatisticsForm } from "@/components/player-statistics-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function AddStatisticsBtn() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-accent hover:text-accent-foreground sm:h-9 h-16">
          Add Match
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Match</DialogTitle>
        </DialogHeader>
        <AddPlayerStatisticsForm
          onCancel={() => setOpen(false)}
          onSubmitForm={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
