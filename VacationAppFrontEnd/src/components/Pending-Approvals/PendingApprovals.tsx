import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import PendingApprovalItem from "./PendingApprovalItem";
export default function PendingApprovals() {
  return (
    <div>
      <div className="flex flex-col gap-2 p-2 border rounded-md">
        <div className="flex justify-between items-center">
          <h3>Pending Approvals</h3>
          <span>4 People</span>
        </div>
        <div className="flex flex-col gap-2">
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
            name="Luka Beridze"
            dateRange="Feb 16 - Feb 20"
            vacationType="sick"
          />
          <PendingApprovalItem
            initials="LB"
            name="Luka Beridze"
            dateRange="Feb 16 - Feb 20"
            vacationType="sick"
          />
          <PendingApprovalItem
            initials="LB"
            name="Luka Beridze"
            dateRange="Feb 16 - Feb 20"
            vacationType="sick"
          />
          <PendingApprovalItem
            initials="LB"
            name="Luka Beridze"
            dateRange="Feb 16 - Feb 20"
            vacationType="sick"
          />
        </div>
      </div>
    </div>
  );
}
