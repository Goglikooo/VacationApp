import PendingApprovalItem from "./PendingApprovalItem";
export default function PendingApprovals() {
  return (
    <section className="flex max-h-100  2xl:max-h-125  flex-col gap-4 rounded-lg bg-pending-bg/30 p-4 text-card-foreground shadow-sm border border-pending/30 border-l-4 border-l-pending">
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
      <div className="grid grid-cols-1 gap-2 overflow-y-scroll custom-scrollbar">
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />{" "}
        <PendingApprovalItem
          initials="LB"
          name="Lukas Brachvogel"
          dateRange="Aug 15 - Aug 22"
          vacationType="Vacation"
        />
      </div>
    </section>
  );
}
