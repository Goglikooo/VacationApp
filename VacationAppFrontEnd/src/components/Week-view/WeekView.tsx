import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { addDays, startOfWeek, isSameDay, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekViewProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function WeekView({
  selectedDate,
  setSelectedDate,
}: WeekViewProps) {
  const [open, setOpen] = useState<boolean>(false);
  //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekView, setWeekView] = useState<Date>(new Date());

  const weekStart = startOfWeek(weekView, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="p-1">
      <div className=" flex items-center justify-between ">
        <div className="flex ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWeekView(addDays(weekView, -7))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWeekView(addDays(weekView, 7))}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="justify-start font-normal"
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setWeekView(date);
                    setOpen(false);
                  }
                }}
                endMonth={new Date(2055, 11, 31)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          variant={isSameDay(selectedDate, new Date()) ? "default" : "ghost"}
          className="text-md  px-3"
          onClick={() => {
            setSelectedDate(new Date());
            setWeekView(new Date());
          }}
        >
          Today
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2 mt-3">
        {days.map((day) => (
          <Button
            key={day.toISOString()}
            variant={isSameDay(day, selectedDate) ? "default" : "ghost"}
            onClick={() => setSelectedDate(day)}
            className="flex flex-col h-auto py-2 gap-0.5"
          >
            <span className="text-xs opacity-70">{format(day, "EEE")}</span>
            <span className="text-sm font-medium">{format(day, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
