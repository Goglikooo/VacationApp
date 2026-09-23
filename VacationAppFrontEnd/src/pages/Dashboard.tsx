import { SectionCards } from "@/components/section-cards";
import AwayThisDayComponent from "@/components/Away-this-Day/AwayThisDayComponent";
import PendingApprovals from "@/components/Pending-Approvals/PendingApprovals";
import WeekView from "@/components/Week-view/WeekView";
import UserOverview from "@/components/User-Overview/UserOverview";
import { useState, useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [boxHeight, setBoxHeight] = useState<number>(300);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = calendarContainerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entries]) => {
      const height = entries.contentRect.height;
      setBoxHeight(height < 200 ? 350 : height);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-3 lg:h-full lg:gap-2 lg:overflow-hidden lg:p-2 ">
      <div className="lg:flex lg:min-h-0 lg:flex-1 ">
        <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1 lg:gap-2">
          <SectionCards />
          <div className="grid w-full  grid-cols-1 gap-5 xl:gap-3 xl:grid-cols-3 xl:grid-rows-1">
            <div className="xl:hidden">
              <WeekView
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div
              ref={calendarContainerRef}
              className="hidden self-start xl:flex xl:row-span-1"
            >
              <Calendar
                className="
                  w-full rounded-lg border border-vacation/30 border-l-4 border-l-vacation bg-vacation-bg/30"
                mode="single"
                selected={selectedDate}
                month={calendarMonth}
                weekStartsOn={1}
                onMonthChange={setCalendarMonth}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                }}
                footer={
                  <Button
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate(today);
                      setCalendarMonth(today);
                    }}
                  >
                    Today
                  </Button>
                }
                endMonth={new Date(2055, 11, 31)}
              />
            </div>
            <AwayThisDayComponent
              boxHeight={boxHeight}
              selectedDate={selectedDate}
            />
            <PendingApprovals boxHeight={boxHeight} />
          </div>
          <UserOverview />
        </div>
      </div>
    </div>
  );
}
