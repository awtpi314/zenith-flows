"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/dist/client/components/navigation";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthHeader({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  async function advanceOneMonth() {
    const nextMonth = new Date(year, month + 1, 1);
    redirect(`/calendar/${nextMonth.getFullYear()}/${nextMonth.getMonth() + 1}`);
  }

  async function retreatOneMonth() {
    const prevMonth = new Date(year, month - 1, 1);
    redirect(`/calendar/${prevMonth.getFullYear()}/${prevMonth.getMonth() + 1}`);
  }

  return (
    <div className="flex items-center justify-between mb-4 border-b-2 pb-2 border-border">
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={retreatOneMonth} aria-label="Previous Month">
        <ChevronLeft />
      </Button>
      <h1 className="text-2xl font-bold">{`${months[month]} ${year}`}</h1>
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={advanceOneMonth} aria-label="Next Month">
        <ChevronRight />
      </Button>
    </div>
  );
}