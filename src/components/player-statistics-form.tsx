import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnyFieldApi, useForm } from "@tanstack/react-form";

const players = [
  { name: "Jernej" },
  { name: "Miha" },
  { name: "Uros" },
  { name: "Simon" },
  { name: "Luka" },
  { name: "Robi" },
];

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export function AddPlayerStatisticsForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const form = useForm({
    defaultValues: {
      teamRed: {
        attacker: "",
        defender: "",
        goals: 0,
      },
      teamBlue: {
        attacker: "",
        defender: "",
        goals: 0,
      },
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
        onSubmit();
      }}
    >
      <div className="grid gap-4">
        <form.Field
          name="teamRed.attacker"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Red Attacker</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.name} value={player.name}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="teamRed.defender"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Red Defender</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jernej">Jernej</SelectItem>
                  <SelectItem value="Miha">Miha</SelectItem>
                  <SelectItem value="Uros">Uros</SelectItem>
                  <SelectItem value="Simon">Simon</SelectItem>
                  <SelectItem value="Luka">Luka</SelectItem>
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="teamRed.goals"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Red Goals</Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                max={9}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="teamBlue.attacker"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Blue Attacker</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.name} value={player.name}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="teamBlue.defender"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Blue Defender</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.name} value={player.name}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="teamBlue.goals"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Blue Goals</Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                max={7}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </div>
      <div className="flex gap-2 mt-6 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
