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
import { useUpdateStatisticsMutation } from "@/queries";
import { matchSchema } from "@/schemas";
import { convexQuery } from "@convex-dev/react-query";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { useState } from "react";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export function AddPlayerStatisticsForm({
  onCancel,
  onSubmitForm,
}: {
  onCancel: () => void;
  onSubmitForm: () => void;
}) {
  const { mutate } = useUpdateStatisticsMutation();
  const { data: players } = useSuspenseQuery(
    convexQuery(api.players.getPlayers, {})
  );
  const [playerSelectOptions, setPlayerSelectOptions] = useState(() =>
    players.map((p) => ({
      id: p._id,
      label: p.name,
      selected: false,
      selector: "",
    }))
  );

  const form = useForm({
    defaultValues: {
      redAttacker: "",
      redDefender: "",
      redScore: 0,
      blueAttacker: "",
      blueDefender: "",
      blueScore: 0,
    },
    validators: {
      onChange: matchSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("onSubmit: ", value);
      mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
        onSubmitForm();
      }}
    >
      <div className="grid gap-4">
        <form.Field
          name="redAttacker"
          validators={{
            onChange: ({ value }) => {
              console.log("validator: ", value);
              return !value ? "Player required!" : undefined;
            },
          }}
          listeners={{
            onChange: ({ value, fieldApi }) => {
              setPlayerSelectOptions(
                playerSelectOptions.map((p) => {
                  if (p.id === value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  } else if (p.id === value && p.selector !== fieldApi.name) {
                    p.selector = fieldApi.name;
                    p.selected = true;
                  } else if (p.id !== value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  }

                  return p;
                })
              );
            },
          }}
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Red Attacker</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {playerSelectOptions.map((player) => (
                    <SelectItem
                      key={player.id}
                      value={player.id}
                      disabled={player.selected}
                    >
                      {player.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="redDefender"
          validators={{
            onChange: ({ value }) => {
              return !value ? "there is a value" : undefined;
            },
          }}
          listeners={{
            onChange: ({ value, fieldApi }) => {
              setPlayerSelectOptions(
                playerSelectOptions.map((p) => {
                  if (p.id === value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  } else if (p.id === value && p.selector !== fieldApi.name) {
                    p.selector = fieldApi.name;
                    p.selected = true;
                  } else if (p.id !== value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  }

                  return p;
                })
              );
            },
          }}
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Red Defender</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {playerSelectOptions.map((player) => (
                    <SelectItem
                      key={player.id}
                      value={player.id}
                      disabled={player.selected}
                    >
                      {player.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="redScore"
          validators={{
            onChange: ({ value }) =>
              value < 0 || value > 7
                ? "Number out of range (0 - 7)"
                : undefined,
          }}
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Red Goals</Label>
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
        <form.Field
          name="blueAttacker"
          validators={{
            onChange: ({ value }) => {
              console.log("validator: ", value);
              return !value ? "there is a value" : undefined;
            },
          }}
          listeners={{
            onChange: ({ value, fieldApi }) => {
              setPlayerSelectOptions(
                playerSelectOptions.map((p) => {
                  if (p.id === value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  } else if (p.id === value && p.selector !== fieldApi.name) {
                    p.selector = fieldApi.name;
                    p.selected = true;
                  } else if (p.id !== value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  }

                  return p;
                })
              );
            },
          }}
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Blue Attacker</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {playerSelectOptions.map((player) => (
                    <SelectItem
                      key={player.id}
                      value={player.id}
                      disabled={player.selected}
                    >
                      {player.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="blueDefender"
          validators={{
            onChange: ({ value }) => {
              return !value ? "there is a value" : undefined;
            },
          }}
          listeners={{
            onChange: ({ value, fieldApi }) => {
              setPlayerSelectOptions(
                playerSelectOptions.map((p) => {
                  if (p.id === value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  } else if (p.id === value && p.selector !== fieldApi.name) {
                    p.selector = fieldApi.name;
                    p.selected = true;
                  } else if (p.id !== value && p.selector === fieldApi.name) {
                    p.selector = "";
                    p.selected = false;
                  }

                  return p;
                })
              );
            },
          }}
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor={field.name}>Team Blue Defender</Label>
              <Select onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  {playerSelectOptions.map((player) => (
                    <SelectItem
                      key={player.id}
                      value={player.id}
                      disabled={player.selected}
                    >
                      {player.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="blueScore"
          validators={{
            onChange: ({ value }) =>
              value < 0 || value > 7
                ? "Number out of range (0 - 7)"
                : undefined,
          }}
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
      <div className="flex gap-2 mt-6 justify-between">
        <Button variant="outline" onClick={onCancel} type="reset">
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isPristine,
          ]}
          children={([canSubmit, isSubmitting, isPristine]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting || isPristine}
            >
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </div>
    </form>
  );
}
