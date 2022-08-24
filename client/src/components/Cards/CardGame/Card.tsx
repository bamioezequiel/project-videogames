import React, { useState} from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

export default function Card({ name, description, price, image, tag }: any) {
    const [favorite, setFavorite] = useState(false);

    function handleFavorites(e: any) {
        e.preventDefault();
        setFavorite(!favorite);
    }

    return (
        <div className={s.wrapper}>
            <div className={s.topCard}>
                <div className={s.wrapper_image}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: '200px'
                    }}>
                <i className={favorite ? s.favIconCard : s.noFavIconCard} onClick={(e) => handleFavorites(e)}>{favorite ? <MdFavorite /> : <MdFavoriteBorder />}</i>
            </div>
            </div>
            <div className={s.outer}>
                <div className={s.content}>
                    <span className={s.bg}>{tag}</span>
                    <h1>{name}</h1>
                    {/* 110 max */}
                    <p>{description.slice(0, 130)}...</p>

                    <div className={s.button}>
                        <NavLink to={`/detail/1`}>
                            ${price}
                        </NavLink>
                        <a className={s.cart_btn}><i className={`${s.cart_icon} ${s.ion_bag}`}></i>ADD TO CART</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

{/* <div className={s.card_container}>
        <div className={s.card_image}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <span className={s.card_tag}>{tag}</span>

        </div>
        <div className={s.card_content}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit harum aliquam ipsam exercitationem vitae veniam minima eligendi tempore</p>
        </div>
    </div> */}