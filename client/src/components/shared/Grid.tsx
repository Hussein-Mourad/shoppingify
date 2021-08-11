import { ReactElement, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  cols?: number;
  smCols?: number;
  mdCols?: number;
  lgCols?: number;
  gap?: number;
}

export default function Grid({
  className,
  children,
  cols = 2,
  gap = 5,
  smCols = 2,
  mdCols = 3,
  lgCols = 4,
}: Props): ReactElement {
  return (
    <div
      className={`grid grid-cols-${cols} gap-${gap} sm:grid-cols-${smCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} ${className}`}
    >
      {children}
    </div>
  );
}
