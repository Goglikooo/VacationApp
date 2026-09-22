const awayPeople = [
  {
    initials: "JD",
    name: "John Doe",
    role: "Marketing",
    back: "Mon, Aug 15",
    status: "vacation",
    statusClass: "bg-vacation-bg text-vacation",
  },
  {
    initials: "JD",
    name: "Jane Doe",
    role: "Marketing",
    back: "Mon, Aug 15",
    status: "sick",
    statusClass: "bg-sick-bg text-sick",
  },
  {
    initials: "GG",
    name: "Goga Gogeshvili",
    role: "Engineering",
    back: "Tue, Feb 16",
    status: "personal",
    statusClass: "bg-personal-bg text-personal",
  },
] as const;
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState, useRef } from "react";
import { faAnglesDown, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAbsenceList } from "../../api/vacationRequests";
import { NoDataComponent } from "../ui/NoDataComponent";
import { Spinner } from "../ui/spinner";
interface AwayThisDayComponentProps {
  boxHeight: number;
  selectedDate: Date;
}

export default function AwayThisDayComponent({
  boxHeight,
  selectedDate,
}: AwayThisDayComponentProps) {
  const isMobile = useIsMobile();
  const listRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [absenceList, setAbsenceList] = useState<AbsenceDTO[]>([]);
  const formattedSelectedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
  useEffect(() => {
    setIsLoading(true);
    getAbsenceList(`${formattedSelectedDate}`)
      .then((res) => {
        setAbsenceList(res.data);
      })
      .catch(() => {
        setAbsenceList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [formattedSelectedDate]);

  const scrollCheck = () => {
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

    scrollCheck();

    const observer = new ResizeObserver(scrollCheck);
    observer.observe(list);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{ height: `${boxHeight}px` }}
      className="relative flex min-h-0 flex-col gap-4 rounded-lg border border-border border-l-4 border-l-personal bg-card p-4 text-card-foreground shadow-sm"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold">Away This Day</h3>
          <p className="text-sm text-muted-foreground">People currently away</p>
        </div>
        <span className="rounded-full bg-personal-bg px-2.5 py-1 text-xs font-medium text-personal">
          {absenceList.length} {absenceList.length > 1 ? "People" : "Person"}
        </span>
      </div>
      {isLoading && <Spinner className="size-8 absolute top-50 left-50" />}
      {absenceList.length === 0 ? (
        <NoDataComponent
          icon={faPeopleRoof}
          type="personal"
          infoText="Full Team Today"
          additionalText="No one has time off scheduled for this date."
        />
      ) : (
        <div
          ref={listRef}
          onScroll={scrollCheck}
          className="grid min-h-0  grid-cols-1 gap-2 overflow-y-scroll custom-scrollbar"
        >
          {absenceList.map((person) => (
            <div
              key={`${person.fullName}-${person.type}`}
              className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                {!isMobile && (
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold  bg-${person.type.toLocaleLowerCase()}-bg text-${person.type.toLocaleLowerCase()}`}
                    aria-hidden="true"
                  >
                    {person.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {person.fullName}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {person.role} · Back {person.endDate}
                  </div>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize 
                bg-${person.type.toLocaleLowerCase()}-bg text-${person.type.toLocaleLowerCase()}`}
              >
                {person.type}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-2 flex justify-center animate-bounce">
        {needsScroll ? <FontAwesomeIcon icon={faAnglesDown} /> : ""}
      </div>
    </section>
  );
}
