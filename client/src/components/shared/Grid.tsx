import { ReactElement, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export default function Grid({ className, children }: Props): ReactElement {
  return (
    <div
      className={`${className} grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
    >
      {children}
    </div>
  );
}
