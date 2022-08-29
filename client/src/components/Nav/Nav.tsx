import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineLogin, AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdGames, MdFavorite } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import s from "./Nav.module.css";
import useAuth from "../../utils/auth";

export default function Nav() {
  const { user, isAuth } = useAuth();
  const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');

  return (
    <div className={s.nav_container}>
      <nav className={s.nav}>
        <div className={s.nav_menu}>
          <div className={s.nav_menu_col1}>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <AiFillHome />
            </NavLink>
            <NavLink to={"/favorites"} className={s.nav_menu_item}>
              <MdFavorite />
              <span className={s.item_amount}>{
                (isAuth)
                  ? user?.favorites.length
                  : favorites?.length
              }</span>
            </NavLink>
            <NavLink to={"/"} className={s.nav_menu_item}>
              <BsFillCartCheckFill />
              <span className={s.item_amount}>0</span>
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
            {
              isAuth ? <NavLink to={"/profile"} className={`${s.nav_menu_item}`}>
                <img src={user.picture} className={s.nav_menu_image_profile} alt="" />
              </NavLink> : <NavLink to={"/login"} className={`${s.nav_menu_item}`}>
                <AiOutlineLogin />
              </NavLink>
            }

          </div>
        </div>
      </nav>
    </div>
  );
}
