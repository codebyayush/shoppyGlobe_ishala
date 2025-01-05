import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterItemSearch } from "../../store/slices/storeSlice";

const SearchBar = () => {
  const storeArr = useSelector((state) => state.store.storeArr);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const search = (query) => {
    if (query.trim() === "") {
      dispatch(filterItemSearch([]));
    } else {
      const filtered = storeArr.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(filterItemSearch(filtered));
    }
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    search(e.target.value);
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    search(searchValue);
  };

  return (
    <>
      <div>
        <form className="flex items-center mb-2" onSubmit={handleIconClick}>
          <input
            placeholder="Search Items..."
            value={searchValue}
            onChange={searchHandler}
            className="w-[500px] p-2 outline-none focus:outline-yellow-400 text-xl"
            type="text"
            name="search-bar"
            id="search-bar"
          />
          <button type="submit">
            <FaSearch className="-ml-10 hover:scale-110 transition-transform duration-300" />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
