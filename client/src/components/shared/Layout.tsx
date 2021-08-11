import cn from "classnames";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SideBar from "../SideBar";

type Props = {
  children: React.ReactNode;
  sideDrawer: React.ReactNode;
};

export default function Layout({ children, sideDrawer }: Props) {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    if (windowDimensions.width >= 768) {
      setIsSideDrawerOpen(true);
    }
    return () => {};
  }, [windowDimensions]);

  const toggleSideMenu = () => {
    if (window && window.innerWidth < 768) {
      setIsSideDrawerOpen(!isSideDrawerOpen);
    } else {
      setIsSideDrawerOpen(true);
    }
  };
  const contentStyle = cn("ml-14 sm:ml-20 px-5 bg-gray-50 md:mr-96", {
    "hidden md:block": isSideDrawerOpen,
  });

  return (
    <div className="w-full min-h-screen">
      <SideBar sideDrawerHandler={toggleSideMenu} />
      <main className={contentStyle}>{children}</main>
      {/* <aside className="hidden h-screen shadow-lg md:right-0 md:block md:fixed md:top-0 ml-14 sm:ml-20 md:ml-0">
        <div className="w-full h-full md:w-96">{sideDrawer}</div>
      </aside> */}
      {isSideDrawerOpen && (
        <aside className="relative h-screen shadow-lg md:right-0 md:fixed md:top-0 ml-14 sm:ml-20 md:ml-0">
          <div className="w-full h-full md:w-96">{sideDrawer}</div>
        </aside>
      )}
    </div>
  );
}
