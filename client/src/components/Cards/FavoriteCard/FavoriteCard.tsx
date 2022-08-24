import React from "react";
import s from "./FavoriteCard.module.css";

export default function FavoriteCard({ image, size }: any) {

  return (
    <div
      className={s.fav_container}
      style={{
        width: '80vh',
        height: (size === 'small' ? '30vh' : '62.7vh'),
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center" }} >
      <div className={s.fav_content}>
        <span className={s.fav_title}>
            <span className={s.fav_tag}>NEW</span> 
            Capcom To Showcase MEga Man Battle Network LEgacy Collection At TGS
        </span>
        <span className={s.fav_subtitle}>More Moster Hunter Rise: Sunbreak content also available</span>
      </div>
    </div>
  );
}
