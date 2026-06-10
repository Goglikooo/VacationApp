import { Calendar } from "@/components/ui/calendar";
import { SectionCards } from "@/components/section-cards";
import { useState } from "react";

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
              captionLayout="dropdown"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
