import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineLogin, AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdGames, MdFavorite } from "react-icons/md";
import { BsFillCartCheckFill, BsJustify } from "react-icons/bs";
import s from "./Nav.module.css";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const handleOpen = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className={s.nav_container}>
      <nav className={s.nav}>
        <div className={s.nav_menu}>
          <div className={s.nav_menu_col1}>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <AiFillHome />
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <MdFavorite />
              <span className={s.item_amount}>5</span>
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <BsFillCartCheckFill />
              <span className={s.item_amount}>1</span>
            </NavLink>
          </div>
          <div className={s.nav_menu_col2}>
            <NavLink to={"/store"} className={s.nav_menu_item}>
              <AiOutlineAppstoreAdd />
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
          </div>
          <div className={s.nav_menu_col3}>
            <NavLink to={"/"} className={`${s.nav_menu_item}`}>
              <AiOutlineLogin />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
