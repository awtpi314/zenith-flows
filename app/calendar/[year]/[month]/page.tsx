import Calendar from "@/components/calendar/calendar";

export default async function CalendarPage({ params }: { params: Promise<{ year: string; month: string }> }) {
  const { year, month } = await params;
  const yearNumber = Number.parseInt(year, 10);
  const monthNumber = Number.parseInt(month, 10);

  return (
    <div className="p-4 w-full h-full flex flex-col">
      <Calendar year={yearNumber} month={monthNumber} />
    </div>
  );
}
