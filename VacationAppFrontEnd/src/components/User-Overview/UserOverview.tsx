import { CalendarDays, Sparkles, TrendingUp } from "lucide-react";

const leaveBreakdown = [
  { label: "Vacation", days: 5, color: "bg-vacation" },
  { label: "Sick", days: 2, color: "bg-sick" },
  { label: "Personal", days: 1, color: "bg-personal" },
];

const overviewStats = [
  {
    label: "Requests this year",
    value: "4",
    icon: CalendarDays,
  },
  {
    label: "Approval rate",
    value: "100%",
    icon: TrendingUp,
  },
  {
    label: "Next public holiday",
    value: "Oct 3",
    icon: Sparkles,
  },
];

const totalLeaveDays = 26;
const usedLeaveDays = 8;
const remainingLeaveDays = totalLeaveDays - usedLeaveDays;
const usedPercentage = Math.round((usedLeaveDays / totalLeaveDays) * 100);

function LeaveRing() {
  return (
    <div
      className="relative grid size-28 shrink-0 place-items-center rounded-full"
      style={{
        background: `conic-gradient(var(--success) ${
          (remainingLeaveDays / totalLeaveDays) * 100
        }%, var(--border) 0)`,
      }}
      aria-label={`${remainingLeaveDays} days left out of ${totalLeaveDays}`}
    >
      <div className="grid size-20 place-items-center rounded-full bg-card text-center">
        <div>
          <div className="text-lg font-semibold leading-none">
            {remainingLeaveDays}
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">
            days left
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserOverview() {
  return (
    <section className=" rounded-lg border border-border border-l-4 border-l-success bg-card p-4 shadow-sm sm:p-6 lg:min-h-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:p-4">
      <div className="mb-6 lg:mb-3">
        <h2 className="text-base font-semibold">Your overview</h2>
        <p className="text-sm text-muted-foreground">
          Your leave summary for 2026
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(210px,1.1fr)] lg:items-stretch lg:gap-3">
        <div className="flex items-center gap-4 lg:justify-center lg:border-r lg:border-border lg:pr-5">
          <div className="grid size-14 shrink-0 place-items-center rounded-full bg-success-bg text-lg font-medium text-success">
            GG
          </div>
          <div>
            <p className="font-semibold">Goga Gogeshvili</p>
            <p className="text-sm text-muted-foreground">Engineering</p>
            <p className="text-xs text-muted-foreground">Joined Jan 2022</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-y border-border py-5 lg:border-y-0 lg:border-r lg:py-0 lg:pr-3">
          <LeaveRing />
          <p className="text-xs text-muted-foreground">
            {usedLeaveDays} of {totalLeaveDays} days used
          </p>
        </div>

        <div className="flex flex-col justify-center border-b border-border pb-5 lg:border-b-0 lg:border-r lg:border-border lg:pb-0 lg:pr-3">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Breakdown by type
          </p>
          <div className="mb-3 flex h-2 overflow-hidden rounded-full bg-muted">
            {leaveBreakdown.map((leaveType) => (
              <div
                key={leaveType.label}
                className={leaveType.color}
                style={{ width: `${(leaveType.days / usedLeaveDays) * 100}%` }}
              />
            ))}
          </div>
          <div className="space-y-2">
            {leaveBreakdown.map((leaveType) => (
              <div
                key={leaveType.label}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${leaveType.color}`} />
                  {leaveType.label}
                </span>
                <span className="text-muted-foreground">
                  {leaveType.days} {leaveType.days === 1 ? "day" : "days"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {overviewStats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg bg-muted/60 p-3"
            >
              <div className="grid size-8 shrink-0 place-items-center rounded-md bg-success-bg text-success">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="font-medium leading-none">{value}</p>
                <p className="mt-1 truncate text-[11px] text-muted-foreground">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">{usedPercentage}% of leave used</span>
    </section>
  );
}
