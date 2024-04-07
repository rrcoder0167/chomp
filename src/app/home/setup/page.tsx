"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

import { api } from "~/trpc/react";
import { redirect } from "next/navigation";

export default function Home() {
  const [stage, setStage] = useState(1);
  const [name, setName] = useState("");
  const [sugar, setSugar] = useState(1);
  const [date, setDate] = useState(new Date("09/25/2000"));

  const form = api.onboarding.set.useMutation();

  switch (stage) {
    case 1:
      return (
        <div className="space-y-2 space-x-1 overflow-x-hidden">
          <Progress value={(stage / 5) * 100} />
          <Input
            placeholder="Full Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={() => setStage(stage + 1)}>Next</Button>
        </div>
      );
    case 2:
      return (
        <div className="space-y-2 space-x-1 overflow-x-hidden">
          <Progress value={(stage / 5) * 100} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                // @ts-expect-error
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <br />
          <Button onClick={() => setStage(stage - 1)}>Back</Button>
          <Button onClick={() => setStage(stage + 1)}>Next</Button>
        </div>
      );
    case 3:
      return (
        <div className="space-y-2 space-x-1 overflow-x-hidden">
          <Progress value={(stage / 5) * 100} />
          <Input
            placeholder="Current Blood Sugar %"
            onChange={(e) => setSugar(Number(e.target.value))}
          />
          <Button onClick={() => setStage(stage - 1)}>Back</Button>
          <Button onClick={() => setStage(stage + 1)}>Next</Button>
        </div>
      );
    case 4:
      return (
        <div className="space-y-2 space-x-1 overflow-x-hidden">
          <Progress value={(stage / 5) * 100} />
          <Input
            placeholder="Target Blood Sugar %"
            onChange={(e) => setSugar(Number(e.target.value))}
          />
          <Button onClick={() => setStage(stage - 1)}>Back</Button>
          <Button onClick={() => setStage(stage + 1)}>Next</Button>
        </div>
      );
    case 5:
      return (
        <div className="space-y-2 space-x-1 overflow-x-hidden">
          <Progress value={(stage / 5) * 100} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                // @ts-expect-error
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <br />
          <Button onClick={() => setStage(stage - 1)}>Back</Button>
          <Button onClick={() => { form.mutate({ date, name, sugar }); redirect("/home"); }}>Done</Button>
        </div>
      );
  }
}
