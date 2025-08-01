import { redirect } from 'next/navigation';

export default async function CalendarPage() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  redirect(`/calendar/${currentYear}/${currentMonth}`);
}