import { useContext } from "react";
import { userContext } from "../../../pages/_app";
import { SearchIcon } from "../Icons";

function SearchInput() {
  const { setSearchModel } = useContext(userContext);
  return (
    <div
      className="searchIcon p-2 bg-white dark:bg-slate-200 dark:text-gray-900 rounded-lg hover:text-secondary-700 hover:dark:text-secondary-700 cursor-pointer"
      onClick={() => setSearchModel(true)}
    >
      <SearchIcon />
    </div>
  );
}

export default SearchInput;
