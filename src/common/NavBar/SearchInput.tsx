import React, { useState } from "react";
import { SearchIcon } from "../Icons";

function SearchInput() {
  const [searchInput, setSearch] = useState<Boolean>(false);
  if (searchInput) {
    setTimeout(() => {
      setSearch(false);
    }, 60000 * 2);
  }
  return (
    <div className="searchIcon p-2 bg-white rounded-lg hover:text-secondary-700 cursor-pointer">
      {searchInput ? (
        <div className="searchInput relative text-xs bg-white w-fit h-6">
          <input
            type="text"
            className="w-full h-full appearance-none block text-black"
          />
          <span
            className="absolute right-0 top-1/2  -translate-y-1/2"
            onClick={() => console.log("search for the query")}
          >
            <SearchIcon />
          </span>
        </div>
      ) : (
        <div onClick={() => setSearch(true)}>
          <SearchIcon />
        </div>
      )}
    </div>
  );
}

export default SearchInput;
