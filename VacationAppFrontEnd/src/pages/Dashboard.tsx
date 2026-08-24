import { SectionCards } from "@/components/section-cards";
import AwayThisDayComponent from "@/components/Away-this-Day/AwayThisDayComponent";
import PendingApprovals from "@/components/Pending-Approvals/PendingApprovals";
import WeekView from "@/components/Week-view/WeekView";
import { useState } from "react";
export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="p-3 flex flex-col gap-4">
      <div className="">Hello Goga!</div>
      <div className=" ">
        <div className="  flex flex-col gap-4 ">
          <SectionCards />
          <div className="">
            {/* // TEST  */}
            <WeekView
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            {/* // TEST  */}
          </div>
          <div className=" flex-1 ">
            <AwayThisDayComponent />
          </div>
          <div>
            <PendingApprovals />
          </div>
        </div>
      </div>
    </div>
  );
}
