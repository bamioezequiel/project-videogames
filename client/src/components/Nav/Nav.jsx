import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineLogin, AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdGames, MdFavorite } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import s from "./Nav.module.css";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";

export default function Nav() {
  const { user, isAuth } = useAuth();
  // const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
  const favoritesDB = useSelector((state) => state.favorites);
  const favorites = useSelector((state) => state.favoritesLS);
  const cart = useSelector((state) => state.cart);
  const cartLS = useSelector((state) => state.cartLS);


  return (
    <div className={s.nav_container}>
      <nav className={s.nav}>
        <div className={s.nav_menu}>
          <div className={s.nav_menu_col1}>
            <NavLink to={"/"} title='Home' className={s.nav_menu_item}>
              <AiFillHome />
            </NavLink>
            <NavLink to={"/favorites"} title='Favorites' className={s.nav_menu_item}>
              <MdFavorite />
              {
                (favoritesDB?.length > 0 || favorites?.length > 0) && <span className={s.item_amount}>
                  {
                    (isAuth)
                    ? favoritesDB?.length
                    : favorites?.length
                  }
                </span>
              }
              {/* <span className={s.item_amount}>
                {
                  (isAuth)
                    ? user?.favorites.length
                    : favorites?.length
                }
              </span> */}
            </NavLink>
            <NavLink to={"/cart"} title='Cart' className={s.nav_menu_item}>
              <BsFillCartCheckFill />
              {
                (cart.cart?.length > 0 || cartLS?.length > 0) && <span className={s.item_amount}>
                  {
                    (isAuth)
                      ? cart.cart?.length
                      : cartLS?.length
                  }
                </span>
              }
            </NavLink>
          </div>
          <div className={s.nav_menu_col2}>
            <NavLink to={"/store"} title='Store' className={s.nav_menu_item}>
              <AiOutlineAppstoreAdd />
            </NavLink>
            <NavLink to={"/"} title='Empty' className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
            <NavLink to={"/"} title='Empty' className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
            <NavLink to={"/"} title='Empty' className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
            <NavLink to={"/"} title='Empty' className={s.nav_menu_item}>
              <MdGames />
            </NavLink>
          </div>
          <div className={s.nav_menu_col3}>
            {
              (isAuth)
                ? <NavLink to={"/profile"} title='Profile' className={`${s.nav_menu_item}`}>
                  <img src={user.picture} className={s.nav_menu_image_profile} alt="" />
                </NavLink>
                : <NavLink to={"/login"} title='Login' className={`${s.nav_menu_item}`}>
                  <AiOutlineLogin />
                </NavLink>
            }

          </div>
        </div>
      </nav>
    </div>
  );
}
