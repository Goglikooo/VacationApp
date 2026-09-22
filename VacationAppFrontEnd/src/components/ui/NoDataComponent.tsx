import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NoDataComponentProps {
  icon: any;
  infoText: string;
  additionalText: string;
  type: string;
}

export const NoDataComponent = ({
  icon,
  infoText,
  additionalText,
  type,
}: NoDataComponentProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-2 ">
      <div className="w-20 h-20 flex justify-center items-center">
        <FontAwesomeIcon icon={icon} className={`text-5xl text-${type}`} />
      </div>

      <p>{infoText}</p>
      <span className="text-center">{additionalText}</span>
    </div>
  );
};
