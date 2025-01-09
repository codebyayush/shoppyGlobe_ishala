import React, { useState } from "react";
// used react-icons for using different icons in the project
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterItemSearch } from "../../store/slices/storeSlice";

const SearchBar = ({className}) => {
  //first we'll get the value of storeArr from the store
  const storeArr = useSelector((state) => state.store.storeArr);
  const dispatch = useDispatch();

  //we'll use searchValue to store the value of the input field
  const [searchValue, setSearchValue] = useState("");

  //search function will filter the items based on the query
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

  //this will update the searchValue and call the search function
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    search(e.target.value);
  };

  //this will handle search button click
  const handleIconClick = (e) => {
    e.preventDefault();
    search(searchValue);
  };

  return (
    <>
      <div>
        <form className={className} onSubmit={handleIconClick}>
          <input
            placeholder="Search Items..."
            value={searchValue}
            onChange={searchHandler}
            className="max-w-[500px] p-2 outline-none focus:outline-yellow-400 text-xl"
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
