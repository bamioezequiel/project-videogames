import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import s from "./Header.module.css";

export default function Header() {
  const [searchBar, setSearchBar] = useState(false);

  function handleSearchBar(e: any){
    e.preventDefault();
    setSearchBar(!searchBar);
  }

  setTimeout(function(){
    searchBar && setSearchBar(false);
}, 20000);

  return (
    <div className={s.header_container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Fallout_logo.svg/640px-Fallout_logo.svg.png"
        className={s.header_logo}
        alt="logo not found" />
      <div className={s.header_search_container}>
        <input
          type="search"
          placeholder="Search..."
          className={searchBar ? s.header_search : s.noneSBDisplay} />
        <div onClick={(e) => handleSearchBar(e)} className={s.search_icon_background}>
          <BiSearch className={s.header_search_icon} />
        </div>
      </div>
    </div>
  );
}
