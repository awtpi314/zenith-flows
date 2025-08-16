"use client";

import { EventWithCalendar } from "@/types/event";
import { DateTimePicker } from "@components/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui";
import { Input } from "@components/ui";
import { useState } from "react";

export default function EventEditor({ event }: { event: EventWithCalendar }) {
  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState<Date | undefined>(event.start);
  const [endDate, setEndDate] = useState<Date | undefined>(event.end);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-full bg-primary/10 rounded-md px-2 py-1 mb-1 text-xs text-left font-medium cursor-pointer"
          style={{ backgroundColor: event.calendar.color ?? "" }}
        >
          {event.title}
        </div>
      </DialogTrigger>
      <DialogContent className="p-3 min-w-[320px] bg-background rounded-md border shadow-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold text-base mb-1">
            <Input value={title} onChange={(v) => setTitle(v.target.value)} className="w-min" />
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-muted-foreground mb-1 relative">
            <label className="font-medium absolute top-0 left-2 bg-background px-2 py-[0.125rem] rounded-sm ring-1 ring-muted">
              Start
            </label>
            <DateTimePicker value={startDate} onChange={setStartDate} className="mt-3" />
          </p>
          <p className="text-sm text-muted-foreground mb-1 relative">
            <label className="font-medium absolute top-0 left-2 bg-background px-2 py-[0.125rem] rounded-sm ring-1 ring-muted">
              End
            </label>
            <DateTimePicker value={endDate} onChange={setEndDate} className="mt-3" />
          </p>
          {event.description && <p className="text-sm mt-2">{event.description}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
