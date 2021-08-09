import { ReactElement, ReactNode } from "react";

interface Props {
  className?: string;
  leftElements?: ReactNode;
  rightElements?: ReactNode;
}

export default function Card({
  className,
  leftElements,
  rightElements,
}: Props): ReactElement {
  return (
    <div className={`${className} flex p-5 bg-white shadow rounded-xl`}>
      {leftElements && <div className="flex-1 mr-4">{leftElements}</div>}
      {rightElements && <div>{rightElements}</div>}
    </div>
  );
}
