import React from "react";
import { BiSearch } from "react-icons/bi";
import s from "./Header.module.css";

export default function Header() {
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
          className={s.header_search} />
        <BiSearch className={s.header_search_icon} />
      </div>
    </div>
  );
}
