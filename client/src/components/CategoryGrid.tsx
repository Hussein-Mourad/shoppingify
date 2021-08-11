import Grid from "components/shared/Grid";
import { ReactElement, ReactNode } from "react";

interface Props {
  name: string;
  className?: string;
  children?: ReactNode;
}

export default function CategoryGrid({
  name,
  className,
  children,
}: Props): ReactElement {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium">{name}</h3>
      <Grid>{children}</Grid>
    </div>
  );
}
