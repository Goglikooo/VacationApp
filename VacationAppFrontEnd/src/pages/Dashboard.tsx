import { SectionCards } from "@/components/section-cards";
import AwayThisDayComponent from "@/components/Away-this-Day/AwayThisDayComponent";
import PendingApprovals from "@/components/Pending-Approvals/PendingApprovals";
import WeekView from "@/components/Week-view/WeekView";
import UserOverview from "@/components/User-Overview/UserOverview";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col gap-4 p-3 lg:h-full lg:gap-2 lg:overflow-hidden lg:p-2">
      <div className="lg:flex lg:min-h-0 lg:flex-1">
        <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1 lg:gap-2 ">
          <SectionCards />
          <div className="grid w-full  grid-cols-1 gap-5 xl:gap-3 xl:grid-cols-3 xl:grid-rows-1">
            <div className="xl:hidden">
              <WeekView
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div className="hidden xl:row-span-2 xl:flex xl:row-span-1">
              <Calendar
                className="max-h-125  w-full rounded-lg border border-vacation/30 border-l-4 border-l-vacation bg-vacation-bg/30 [--cell-size:--spacing(9)]"
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                }}
                endMonth={new Date(2055, 11, 31)}
              />
            </div>
            <AwayThisDayComponent />
            <PendingApprovals />
          </div>
          <UserOverview />
        </div>
      </div>
    </div>
  );
}
