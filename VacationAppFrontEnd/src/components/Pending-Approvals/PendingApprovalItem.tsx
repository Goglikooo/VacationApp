import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

interface PendingApprovalItemProps {
  initials: string;
  name: string;
  dateRange: string;
  vacationType: string;
}

export default function PendingApprovalItem({
  initials,
  name,
  dateRange,
  vacationType,
}: PendingApprovalItemProps) {
  const statusClass =
    vacationType.toLowerCase() === "vacation"
      ? "bg-vacation-bg text-vacation"
      : vacationType.toLowerCase() === "sick"
        ? "bg-sick-bg text-sick"
        : "bg-personal-bg text-personal";

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border border-l-4 border-l-pending bg-card p-3 text-card-foreground transition-colors hover:bg-muted/50">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pending-bg text-sm font-semibold text-pending">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="break-words text-sm font-medium leading-tight">
            {name}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {dateRange}
          </div>
        </div>
      </div>
      <div
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClass}`}
      >
        {vacationType}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label={`Reject ${name}'s request`}
          title="Reject request"
          className="rounded-md p-1 text-destructive transition-colors hover:bg-sick-bg"
        >
          <FontAwesomeIcon icon={faSquareMinus} className="text-lg" />
        </button>
        <button
          type="button"
          aria-label={`Approve ${name}'s request`}
          title="Approve request"
          className="rounded-md p-1 text-success transition-colors hover:bg-success-bg"
        >
          <FontAwesomeIcon icon={faSquareCheck} className="text-lg" />
        </button>
      </div>
    </div>
  );
}
