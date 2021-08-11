import cn from "classnames";
import { ReactElement, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  cols?: number;
  smCols?: number;
  mdCols?: number;
  lgCols?: number;
  xlCols?: number;
  gap?: number;
}

export default function Grid({
  className,
  children,
  gap = 5,
  cols = 2,
  smCols = 2,
  mdCols = 2,
  lgCols = 3,
  xlCols = 4,
}: Props): ReactElement {
  const styles = cn(
    className,
    `grid grid-cols-${cols} sm:grid-cols-${smCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} xl:grid-cols-${xlCols} gap-${gap}`
  );
  return <div className={styles}>{children}</div>;
}
