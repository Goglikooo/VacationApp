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
  {
    initials: "SC",
    name: "Sarah Connor",
    role: "DevOps Engineer",
    back: "Fri, Jul 1",
    status: "sick",
    statusClass: "bg-sick-bg text-sick",
  },
] as const;

export default function AwayThisDayComponent() {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold">Away This Day</h3>
          <p className="text-sm text-muted-foreground">People currently away</p>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {awayPeople.length} People
        </span>
      </div>
      <div className="grid gap-2 grid-cols-1">
        {awayPeople.map((person) => (
          <div
            key={`${person.name}-${person.status}`}
            className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${person.statusClass}`}
                aria-hidden="true"
              >
                {person.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  {person.name}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {person.role} · Back {person.back}
                </div>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${person.statusClass}`}
            >
              {person.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
