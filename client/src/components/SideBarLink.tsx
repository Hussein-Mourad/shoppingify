import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isSelected?: boolean;
  path: string;
  tooltip?: string;
};

export default function SideBarLink({
  children,
  isSelected = false,
  path,
  tooltip = "",
}: Props): JSX.Element {
  return (
    <>
      <Link href={path} passHref>
        <a className="relative group">
          {isSelected && (
            <span className="absolute top-0 left-0 block w-1 h-full bg-yellow-500 xs:w-2 rounded-r-md"></span>
          )}

          {tooltip && (
            <div
              className="absolute hidden translate-x-4 -translate-y-1/2 left-full top-1/2 group-hover:block"
              tabIndex={-1}
            >
              <span className="relative block px-5 py-1 text-white rounded-md bg-trueGray-700">
                <span
                  className="absolute left-0 w-0 h-0 -translate-x-2 -translate-y-1/2 border border-t-8 border-b-8 border-transparent top-1/2"
                  style={{ borderRight: "8px solid  #404040" }}
                />
                {tooltip}
              </span>
            </div>
          )}
          <button
            className="w-full h-16 transition-all duration-300 ease-in-out text-trueGray-700 active:bg-gray-100/70"
            tabIndex={-1}
          >
            {children}
          </button>
        </a>
      </Link>
    </>
  );
}
