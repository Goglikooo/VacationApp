import { Calendar } from "@/components/ui/calendar";
import { SectionCards } from "@/components/section-cards";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="p-3 flex flex-col gap-4">
      <div className="" onClick={() => console.log(date)}>
        Hello Goga!
      </div>
      <div className=" ">
        <div className=" bg-red-100 flex flex-col gap-4">
          <SectionCards />
          <div className="flex gap-10">
            {/* // TEST  */}
            <Field className="mx-auto w-44">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-start font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    defaultMonth={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                    endMonth={new Date(2055, 11, 31)}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            {/* // TEST  */}
          </div>
          <div className=" flex-1">
            aq iqneba is ragaceebi rac kalendarshi archeul dgeebze xdeba
          </div>
        </div>
      </div>
    </div>
  );
}
