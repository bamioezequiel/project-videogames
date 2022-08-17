import React from "react";
import s from "./Card.module.css";

export default function Card({ image, size }: any) {

  return (
    <div
      className={s.card_container}
      style={{
        width: '80vh',
        height: (size === 'small' ? '30vh' : '62.7vh'),
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center" }} >
      <div className={s.card_content}>
        <span className={s.card_title}>
            <span className={s.card_tag}>NEW</span> 
            Capcom To Showcase MEga Man Battle Network LEgacy Collection At TGS
        </span>
        <span className={s.card_subtitle}>More Moster Hunter Rise: Sunbreak content also available</span>
      </div>
    </div>
  );
}
