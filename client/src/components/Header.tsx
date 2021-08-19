import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import InputGroup from "./shared/InputGroup";

interface Props {}

function Header(props: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  return (
    <header className="flex items-center w-full">
      <h1 className="flex-1 hidden mb-3 text-2xl font-semibold text-trueGray-800 sm:mb-0 md:block">
        <span className="text-yellow-primary">Shoppingify</span> allows you take
        your shopping llist wherever you go
      </h1>
      <div className="w-full mt-3 md:mt-0 md:w-96 md:ml-3">
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
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchValue && router.push("/?name=" + searchValue);
              !searchValue && router.push("/");
              alert("Todo");
            }
          }}
        />
      </div>
    </header>
  );
}

export default Header;
