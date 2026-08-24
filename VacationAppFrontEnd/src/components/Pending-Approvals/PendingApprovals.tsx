import PendingApprovalItem from "./PendingApprovalItem";
export default function PendingApprovals() {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-pending/30 bg-pending-bg/30 p-4 text-card-foreground shadow-sm">
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
      <div className="grid grid-cols-1 gap-2">
        <PendingApprovalItem
          initials="JD"
          name="John Doe"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />
        <PendingApprovalItem
          initials="GG"
          name="Goga Gogeshvili"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />
        <PendingApprovalItem
          initials="LB"
          name="Marina Beridze"
          dateRange="Feb 16 - Feb 20"
          vacationType="sick"
        />
        <PendingApprovalItem
          initials="LB"
          name="Luka Basiladze"
          dateRange="Feb 16 - Feb 20"
          vacationType="personal"
        />
      </div>
    </section>
  );
}
