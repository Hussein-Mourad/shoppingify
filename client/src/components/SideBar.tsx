/* eslint-disable @next/next/no-img-element */
import ChartIcon from "@material-ui/icons/InsertChartOutlined";
import ListIcon from "@material-ui/icons/List";
import ReplayIcon from "@material-ui/icons/Replay";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useAppSelector } from "app/hooks";
import { selectProductsCount } from "features/shoppingList/shoppingListSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import Badge from "./shared/Badge";
import Button from "./shared/Button";
import SideBarLink from "./SideBarLink";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

interface SideBarProps {
  shoppingListButtonDisabled?: boolean;
  sideDrawerHandler: () => void;
}

export default function SideBar({
  shoppingListButtonDisabled = false,
  sideDrawerHandler,
}: SideBarProps): JSX.Element {
  const router = useRouter();
  const count = useAppSelector(selectProductsCount);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {}
  };

  return (
    <aside className="fixed top-0 left-0 flex flex-col items-center justify-between h-screen py-4 bg-white shadow-lg w-14 sm:w-20">
      <Link href="/" passHref>
        <a className="w-12 sm:w-14">
          <img src="/img/logo.svg" alt="logo"  className="w-full"/>
        </a>
      </Link>

      <div className="flex flex-col justify-between w-full">
        <SideBarLink
          isSelected={router.asPath === "/"}
          path="/"
          tooltip="Items"
        >
          <ListIcon fontSize="large" />
        </SideBarLink>
        <SideBarLink
          isSelected={router.asPath === "/history"}
          path="/history"
          tooltip="History"
        >
          <ReplayIcon fontSize="large" />
        </SideBarLink>
        <SideBarLink
          isSelected={router.asPath === "/stats"}
          path="/stats"
          tooltip="Statistics"
        >
          <ChartIcon fontSize="large" />
        </SideBarLink>

        <Button
          className="relative w-full group"
          onClick={(e) => handleLogout()}
        >
          <div className="absolute hidden translate-x-4 -translate-y-1/2 left-full top-1/2 group-hover:block group-focus-visible:block">
            <span className="relative block px-5 py-1 text-white rounded-md bg-trueGray-700">
              <span
                className="absolute left-0 w-0 h-0 -translate-x-2 -translate-y-1/2 border border-t-8 border-b-8 border-transparent top-1/2"
                style={{ borderRight: "8px solid  #404040" }}
              />
              Logout
            </span>
          </div>

          <div className="flex items-center justify-center w-full transition-all duration-300 ease-in-out h-14 text-trueGray-700 active:bg-gray-100/70">
            <ExitToAppIcon fontSize="large" />
          </div>
        </Button>
      </div>

      <Button
        className="relative w-12 h-12 text-white rounded-full sm:h-14 sm:w-14 focus-visible:ring-2 focus-visible:ring-black/90 focus-visible:ring-offset-2 "
        onClick={sideDrawerHandler}
        color="orange"
        disabled={shoppingListButtonDisabled}
      >
        <Badge number={count} />
        <span className="sm:hidden">
          <ShoppingCartIcon />
        </span>
        <span className="hidden sm:block">
          <ShoppingCartIcon style={{ fontSize: 30 }} />
        </span>
      </Button>
    </aside>
  );
}
