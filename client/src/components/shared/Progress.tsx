import { ReactElement } from "react";

interface Props {
  text: string;
  percentage: number;
  progressColor?: string;
  className?: string;
}

export default function Progress({
  className,
  text,
  percentage,
  progressColor = "bg-blue-500",
}: Props): ReactElement {
  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{text}</h3>
        <span className="text-lg font-medium">{percentage}%</span>
      </div>
      <div
        className="w-full h-2 mt-2 bg-gray-200 rounded-md"
        aria-valuenow={percentage}
        aria-roledescription="progress bar"
        aria-valuemax={100}
        aria-valuemin={0}
      >
        <div
          className={`w-5/12 h-full  ${progressColor} rounded-md`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
