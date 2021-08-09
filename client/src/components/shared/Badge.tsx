import cn from "classnames";

interface Props {
  number: number;
}

export default function Badge({ number }: Props): JSX.Element {
  const style = cn(
    "absolute top-0 right-0 flex items-center justify-center p-2  translate-x-1/4 -translate-y-1/3 sm:translate-x-1/2 sm:-translate-y-1/3 bg-red-500 rounded-lg text-sm sm:text-base z-10",
    { "w-7 h-6 sm:w-9 sm:h-8": number > 99 },
    { "w-6 h-6 sm:w-7 sm:h-7": number <= 99 }
  );
  return (
    <>
      {number > 0 && (
        <div className={style}>{number > 99 ? "99+" : number}</div>
      )}
    </>
  );
}
