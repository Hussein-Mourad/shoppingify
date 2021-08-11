import React, { ReactElement, ReactNode } from "react";

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
      {leftElements}
      {rightElements}
    </div>
  );
}
