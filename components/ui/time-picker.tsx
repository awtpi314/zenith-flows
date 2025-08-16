"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TimePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a time...",
  required = false,
}: DateTimePickerProps) {
  const [currentHour, setCurrentHour] = useState<number | undefined>(
    value?.getHours() ? value.getHours() % 12 || 12 : undefined,
  );
  const [currentMinute, setCurrentMinute] = useState<number | undefined>(value?.getMinutes());
  const [amPm, setAmPm] = useState<"AM" | "PM">(value ? (value.getHours() < 12 ? "AM" : "PM") : "AM");

  useEffect(() => {
    if (value) {
      setCurrentHour(value.getHours() % 12 || 12);
      setCurrentMinute(value.getMinutes());
      setAmPm(value.getHours() < 12 ? "AM" : "PM");
    }
  }, [value]);

  useEffect(() => {
    if (currentHour !== undefined && currentMinute !== undefined && amPm) {
      let hour = currentHour % 12;
      if (amPm === "PM") hour += 12;
      const newDate = new Date(value || Date.now());
      newDate.setHours(hour);
      newDate.setMinutes(currentMinute);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      onChange?.(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour, currentMinute, amPm]);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <input
          type="time"
          value={value && !isNaN(value.getTime()) ? format(value, "HH:mm") : ""}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":").map(Number);
            if (hours === undefined || minutes === undefined) {
              return;
            }
            const period: "AM" | "PM" = hours < 12 ? "AM" : "PM";
            setCurrentHour(hours % 12 || 12);
            setCurrentMinute(minutes);
            setAmPm(period);
            const newDate = new Date();
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            onChange?.(newDate);
          }}
          placeholder={placeholder}
          required={required}
          className={cn("min-w-27 p-2 border rounded", className)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-60 h-64">
        <div className="flex h-full">
          <div className="flex-1 flex flex-col overflow-y-auto max-h-full items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">Hour</p>
            {Array.from({ length: 12 }, (_, hour) => (
              <p
                key={hour}
                className={cn("text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer", {
                  "bg-primary text-primary-foreground": currentHour === hour + 1,
                })}
                onClick={() => setCurrentHour(hour + 1)}
              >
                {(hour + 1).toString().padStart(2, "0")}
              </p>
            ))}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto max-h-full items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">Minute</p>
            {Array.from({ length: 60 }, (_, minute) => (
              <p
                key={minute}
                className={cn("text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer", {
                  "bg-primary text-primary-foreground": currentMinute === minute,
                })}
                onClick={() => setCurrentMinute(minute)}
              >
                {minute.toString().padStart(2, "0")}
              </p>
            ))}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto max-h-full items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">AM/PM</p>
            {["AM", "PM"].map((period) => (
              <p
                key={period}
                className={cn("text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer", {
                  "bg-primary text-primary-foreground": amPm === period,
                })}
                onClick={() => setAmPm(period as "AM" | "PM")}
              >
                {period}
              </p>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
