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
  return (
    <div
      id="list item"
      className="bg-blue-500 text-white p-2 rounded-md flex justify-between items-center"
    >
      <div className="flex gap-2 items-center">
        <div className="bg-rose-200 text-gray-800 p-3 rounded-2xl text-md">
          {initials}
        </div>

        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs ">{dateRange}</div>
        </div>
      </div>
      <div className="bg-violet-400 text-white px-3 py-1 rounded-md text-sm">
        {vacationType}
      </div>

      <div className="flex gap-1 items-center">
        <button className=" ">
          <FontAwesomeIcon
            icon={faSquareMinus}
            size="2xl"
            className="text-red-500"
          />
        </button>
        <button className="">
          <FontAwesomeIcon
            icon={faSquareCheck}
            size="2xl"
            className="text-green-500"
          />
        </button>
      </div>
    </div>
  );
}
