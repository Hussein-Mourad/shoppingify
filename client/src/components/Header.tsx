import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import InputGroup from "./shared/InputGroup";
import { useAppSelector } from "app/hooks";
import cn from "classnames";


function Header(): ReactElement {
  const isSideDrawerOpen = useAppSelector(
    (state) => state.layout.isSideDrawerOpen
  );
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(router.query.filter || "");

  const titleStyle = cn(
    "flex-1  mb-3 text-2xl font-semibold text-trueGray-800 sm:mb-0 ",
    { "hidden md:block": !isSideDrawerOpen },
    { "hidden lg:block": isSideDrawerOpen }
  );

  const inputWrapperStyle = cn(
    "w-full mt-3 md:mt-0 ",
    { "md:w-72 lg:w-96 md:ml-4": !isSideDrawerOpen },
    { "lg:w-52 xl:w-80 lg:ml-4": isSideDrawerOpen }
  );

  return (
    <header className="flex items-center w-full">
      <h1 className={titleStyle}>
        <span className="text-yellow-primary">Shoppingify</span> allows you take
        your shopping list wherever you go
      </h1>
      <div className={inputWrapperStyle}>
        <InputGroup
          type="search"
          className="bg-white border-2 shadow-sm hover:border-gray-600 focus-within:border-gray-600 focus-within:shadow-md group "
          inputClassName="py-3 -ml-1 placeholder-gray-400 group-hover:placeholder-gray-600 group-focus-within:placeholder-gray-600"
          placeholder="search item"
          leftElement={
            <SearchIcon
              className="z-10 ml-3 text-gray-400 bg-white group-hover:text-gray-600 group-focus-within:text-gray-600"
              fontSize="medium"
            />
          }
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            !e.target.value && router.push("/");
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchValue && router.push("/?filter=" + searchValue);
              !searchValue && router.push("/");
            }
          }}
        />
      </div>
    </header>
  );
}

export default Header;
