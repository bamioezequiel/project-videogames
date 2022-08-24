import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ id, name, description, image, size, tag }: any) {

  return (
    <NavLink style={{textDecoration: 'none'}} to={`/detail/${id}`}>
    <div
      className={s.card_container}
      style={{
        width: '80vh',
        height: (size === 'small' ? '30vh' : '62.7vh'),
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "top" }} >
      <div className={s.card_content}>
        <span className={s.card_title}>
            <span className={s.card_tag}>{tag}</span> 
            {name}
        </span>
        <span className={s.card_subtitle}>{description.slice(0, 120)}...</span>
      </div>
    </div>
    </NavLink>
  );
}
