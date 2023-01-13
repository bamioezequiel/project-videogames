import React from "react";
 import { NavLink } from "react-router-dom";
 import useFavorites from '../../../hooks/useFavorites';
import s from "./FavoriteCard.module.css";

export default function FavoriteCard({ game, size, tag }) {
  const { handleFavorites } = useFavorites();
  return (
    <div>
      <button onClick={(e) => handleFavorites(e, game) } className={s.fav_btn}>X</button>
      <NavLink style={{ textDecoration: 'none' }} to={`/detail/${game.id}`}>
        <div
          className={s.fav_container}
          style={{
            width: '80vh',
            height: (size === 'small' ? '31vh' : '62.7vh'),
            backgroundImage: `url(${game.main_image})`,
            backgroundSize: "cover",
            backgroundPosition: "top"
          }} >
          <div className={s.fav_content} style={{
            height: (size === 'small' ? '15vh' : '20vh')
          }}>
            <span className={s.fav_title}>
              <span className={s.fav_tag}>{tag}</span>
              {game.name}
            </span>
            <span className={s.fav_subtitle}>{game.description.slice(0, 120)}...</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
