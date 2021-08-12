import ChartIcon from "@material-ui/icons/InsertChartOutlined";
import ListIcon from "@material-ui/icons/List";
import ReplayIcon from "@material-ui/icons/Replay";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "public/img/logo.svg";
import Badge from "./shared/Badge";
import Button from "./shared/Button";
import SideBarLink from "./SideBarLink";

interface SideBarProps {
  shoppingListButtonDisabled?: boolean;
  sideDrawerHandler: () => void;
}

export default function SideBar({
  shoppingListButtonDisabled = false,
  sideDrawerHandler,
}: SideBarProps): JSX.Element {
  const { asPath } = useRouter();
  return (
    <aside className="fixed top-0 left-0 z-10 flex flex-col items-center justify-between h-screen pt-4 pb-10 bg-white shadow-lg w-14 sm:w-20">
      <Link href="/" passHref>
        <a className="w-12 sm:w-14">
          <Image src={Logo} alt="logo" layout="responsive" />
        </a>
      </Link>

      <div className="flex flex-col justify-between w-full h-[30%]">
        <SideBarLink isSelected={asPath === "/"} path="/" tooltip="Items">
          <ListIcon fontSize="large" />
        </SideBarLink>
        <SideBarLink
          isSelected={asPath === "/history"}
          path="/history"
          tooltip="History"
        >
          <ReplayIcon fontSize="large" />
        </SideBarLink>
        <SideBarLink
          isSelected={asPath === "/stats"}
          path="/stats"
          tooltip="Statistics"
        >
          <ChartIcon fontSize="large" />
        </SideBarLink>
      </div>

      <Button
        className="relative w-12 h-12 text-white rounded-full sm:h-14 sm:w-14 focus-visible:ring-2 focus-visible:ring-black/90 focus-visible:ring-offset-2 "
        onClick={sideDrawerHandler}
        color="orange"
        disabled={shoppingListButtonDisabled}
      >
        <Badge number={1} />
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
