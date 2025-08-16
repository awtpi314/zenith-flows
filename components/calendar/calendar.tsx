import { auth } from "@/auth";
import prisma from "@/prisma";
import EventEditor from "./event-editor";
import MonthHeader from "./month-header";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function Calendar({ year, month }: { year: number; month: number }) {
  const session = await auth();
  const user = session?.user;
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  const events = await prisma.event.findMany({
    where: {
      calendar: {
        userId: user?.id,
      },
      start: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month - 1, new Date(year, month, 0).getDate() + 1),
      },
    },
    include: {
      calendar: true,
    },
  });

  const daysInMonth = new Date(year, month, 0).getDate();
  const weeksInMonth = Math.ceil((daysInMonth + new Date(year, month - 1, 1).getDay()) / 7);
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  return (
    <div className="border border-border rounded-lg shadow-lg p-4 flex flex-col w-full h-full">
      <MonthHeader month={month - 1} year={year} />
      <div className="flex w-full">
        {days.map((day) => (
          <h2 className="text-lg font-semibold basis-[14%] text-center" key={`day-${day}`}>
            {day}
          </h2>
        ))}
      </div>
      <div className="flex flex-col w-full grow">
        {Array.from({ length: weeksInMonth }, (_, weekIndex) => (
          <div
            key={`week-${weekIndex}`}
            className={`flex w-full ${weekIndex !== weeksInMonth - 1 ? "border-b border-border" : ""}`}
            style={{ flexBasis: `calc(100%/${weeksInMonth})` }}
          >
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const dayNumber = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
              const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
              const currentDate = new Date(year, month - 1, dayNumber);
              return (
                <div
                  key={`day-${weekIndex}-${dayIndex}`}
                  className={`py-2 px-3 flex flex-col items-center justify-start basis-[14%] rounded-lg ${isCurrentMonth ? "hover:bg-muted" : "text-muted-foreground/80 bg-muted/50"}`}
                >
                  <p className="text-left w-full">{currentDate.getDate()}</p>
                  {events
                    .filter((event) => {
                      const eventDate = new Date(event.start);
                      return (
                        eventDate.getFullYear() === year &&
                        eventDate.getMonth() === month - 1 &&
                        eventDate.getDate() === currentDate.getDate()
                      );
                    })
                    .map((event) => (
                      <EventEditor event={event} key={event.id} />
                    ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
