import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PendingApprovalItem from "./PendingApprovalItem";

import { useRef, useState, useEffect } from "react";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { getPendingVacations } from "./../../api/vacationRequests";

interface PendingApprovalsProps {
  boxHeight: number;
}

export default function PendingApprovals({ boxHeight }: PendingApprovalsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  const [pendingVacations, setPendingVacations] = useState<VacationRequest[]>(
    [],
  );

  useEffect(() => {
    getPendingVacations().then((res) => {
      setPendingVacations(res.data);
    });
  }, []);

  const checkScroll = () => {
    const list = listRef.current;
    if (!list) return;

    const hasOverflow = list.scrollHeight > list.clientHeight;
    const isAtBottom =
      list.scrollTop + list.clientHeight >= list.scrollHeight - 1;

    setNeedsScroll(hasOverflow && !isAtBottom);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    checkScroll();

    const observer = new ResizeObserver(checkScroll);
    observer.observe(list);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{ height: `${boxHeight}px` }}
      className="relative  flex  flex-col gap-4 rounded-lg bg-pending-bg/30 p-4 text-card-foreground shadow-sm border border-pending/30 border-l-4 border-l-pending"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Pending Approvals</h3>
          <p className="text-sm text-muted-foreground">
            Requests waiting for review
          </p>
        </div>
        <span className="rounded-full bg-pending-bg px-2.5 py-1 text-xs font-medium text-pending">
          6 Requests
        </span>
      </div>
      <div
        ref={listRef}
        onScroll={checkScroll}
        className="grid grid-cols-1 gap-2 overflow-y-scroll custom-scrollbar "
      >
        {pendingVacations.map((item) => {
          return (
            <PendingApprovalItem
              key={item.id}
              name={item.requestedBy.fullName}
              startDate={item.startDate}
              endDate={item.endDate}
              type={item.type}
            />
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center animate-bounce">
        {needsScroll ? <FontAwesomeIcon icon={faAnglesDown} /> : ""}
      </div>
    </section>
  );
}
