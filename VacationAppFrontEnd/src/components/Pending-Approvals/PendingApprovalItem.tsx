import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

interface PendingApprovalItemProps {
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export default function PendingApprovalItem({
  name,
  startDate,
  endDate,
  type,
}: PendingApprovalItemProps) {
  const statusClass =
    type.toLowerCase() === "vacation"
      ? "bg-vacation-bg text-vacation"
      : type.toLowerCase() === "sick"
        ? "bg-sick-bg text-sick"
        : "bg-personal-bg text-personal";

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const getInitialsFromName = (fullName: string) => {
    const NamesArray = fullName.split(" ");
    const result = NamesArray[0][0] + NamesArray[1][0];
    return result;
  };

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-card p-3 text-card-foreground transition-colors hover:bg-muted/50">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className=" flex size-9 shrink-0 items-center justify-center rounded-full bg-pending-bg text-sm font-semibold text-pending xl:hidden 2xl:flex">
          {getInitialsFromName(name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="break-words text-sm font-medium leading-tight">
            {name}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {formattedDate(startDate)} - {formattedDate(endDate)}
          </div>
        </div>
      </div>
      <div
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClass}`}
      >
        {type}
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
