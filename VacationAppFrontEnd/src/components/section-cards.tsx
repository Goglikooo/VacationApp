import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";

export function SectionCards() {
  return (
    <div className="grid grid-cols-3 gap-4 items-stretch">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex h-full flex-col justify-between">
          <div className="flex  items-center justify-between gap-2">
            <CardTitle className="text-xl font-semibold">26</CardTitle>
            <Badge variant="outline">100%</Badge>
          </div>
          <CardDescription className="mt-auto">Total Employees</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-full flex flex-col">
        <CardHeader className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xl font-semibold">5</CardTitle>
            <Badge variant="outline">19%</Badge>
          </div>

          <CardDescription className="mt-auto">Away Today</CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-full flex flex-col">
        <CardHeader className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xl font-semibold">12</CardTitle>
            <Badge variant="outline">15%</Badge>
          </div>
          <CardDescription className="mt-auto">
            Pending Approvals
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
