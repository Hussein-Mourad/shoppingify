import SearchIcon from "@material-ui/icons/Search";
import { ReactElement } from "react";
import InputGroup from "./shared/InputGroup";

interface Props {}

function Header(props: Props): ReactElement {
  return (
    <header className="flex flex-col items-center w-full sm:flex-row">
      <h1 className="flex-1 mb-3 text-2xl font-semibold text-trueGray-800 sm:mb-0">
        <span className="text-yellow-500">Shoppingify</span> allows you take
        your shopping llist wherever you go
      </h1>
      <div className="sm:w-96 sm:ml-3">
        <InputGroup
          className="border-2 shadow-sm hover:border-gray-600 focus-within:border-gray-600 focus-within:shadow-md group"
          inputClassName="py-3 placeholder-gray-400 group-hover:placeholder-gray-600 group-focus-within:placeholder-gray-600"
          leftElement={
            <SearchIcon
              className="mx-2 text-gray-400 bg-white group-hover:text-gray-600 group-focus-within:text-gray-600"
              fontSize="medium"
            />
          }
          placeholder="search item"
        />
      </div>
    </header>
  );
}

export default Header;
