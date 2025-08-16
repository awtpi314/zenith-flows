import { Calendar, Event } from "@prisma/client";

export interface EventWithCalendar extends Event {
  calendar: Calendar;
}
