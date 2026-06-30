import { Calendar } from "@/components/ui/calendar";
import { SectionCards } from "@/components/section-cards";
import { useState } from "react";

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex gap-2 flex-1 flex-col p-4  ">
      <div className="">Hello Goga!</div>
      <div className=" flex gap-2 flex-1 ">
        <div className=" flex flex-col gap-5 flex-2  ">
          <SectionCards />

          <Calendar
            className="rounded-lg border  [--cell-size:--spacing(10)] md:[--cell-size:--spacing(20)]"
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
          />
        </div>
        <div className="flex-1 border border-red-500">TEST3</div>
      </div>
    </div>
  );
}

{
  /* <Calendar
              className="rounded-lg border"
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
            /> */
}

{
  /* <SectionCards /> */
}
