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
    <section className="flex flex-col gap-3 rounded-lg border border-vacation/30 bg-vacation-bg/30 p-3 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous week"
            title="Previous week"
            className="text-vacation hover:bg-vacation-bg hover:text-vacation"
            onClick={() => setWeekView(addDays(weekView, -7))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next week"
            title="Next week"
            className="text-vacation hover:bg-vacation-bg hover:text-vacation"
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
                className="justify-start border-vacation/40 bg-background font-normal hover:bg-vacation-bg hover:text-vacation"
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
          className={`px-3 text-sm ${
            isSameDay(selectedDate, new Date())
              ? "text-primary-foreground hover:bg-primary/80"
              : "text-vacation hover:bg-vacation-bg hover:text-vacation"
          }`}
          onClick={() => {
            setSelectedDate(new Date());
            setWeekView(new Date());
          }}
        >
          Today
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1.5 border-t border-vacation/20 pt-3">
        {days.map((day) => (
          <Button
            key={day.toISOString()}
            variant={isSameDay(day, selectedDate) ? "default" : "ghost"}
            onClick={() => setSelectedDate(day)}
            aria-label={format(day, "EEEE, MMMM d, yyyy")}
            className={`flex h-auto min-w-0 flex-col gap-0.5 rounded-md border py-2 ${
              isSameDay(day, selectedDate)
                ? "border-vacation bg-vacation text-primary-foreground shadow-sm"
                : "border-border bg-background text-foreground hover:border-vacation/50 hover:bg-vacation-bg hover:text-vacation"
            }`}
          >
            <span className="text-xs opacity-70">{format(day, "EEE")}</span>
            <span className="text-sm font-medium">{format(day, "d")}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}
