import { ReactElement, ReactNode } from "react";
import { useAppSelector } from "app/hooks";
import cn from "classnames";

interface Props {
  className?: string;
  children?: ReactNode;
}

export default function Grid({ className, children }: Props): ReactElement {
  const isSideDrawerOpen = useAppSelector(
    (state) => state.layout.isSideDrawerOpen
  );
  const style = cn(
    className,
    "grid grid-cols-1  gap-5",
    { "xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": !isSideDrawerOpen },
    { "xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3": isSideDrawerOpen }
  );

  return <div className={style}>{children}</div>;
}
