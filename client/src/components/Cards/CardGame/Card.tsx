import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { getFavoritesLocalStorage } from "../../../redux/actions";

export default function Card({ game, tag }: any) {
    const dispatch: Function = useDispatch();
    const [favorite, setFavorite] = useState(false);
    // const game = { id, name, description, price, image, tag };

    useEffect(() => {
        let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
        favoritesLS?.find((f: any) => f.id == game.id && setFavorite(true));
    }, [dispatch, game.id]);


    function handleFavorites(e: any) {
        e.preventDefault();
        setFavorite(!favorite);

        if (!favorite) {
            if (!localStorage.getItem("favorites")) {
                let favoritesLS = [];
                favoritesLS.push(game);
                localStorage.setItem("favorites", JSON.stringify(favoritesLS));
            } else {
                let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
                if (favoritesLS?.filter((f: any) => f.id !== game.id)) {
                    favoritesLS.unshift(game);
                    localStorage.setItem("favorites", JSON.stringify(favoritesLS));
                }
            }
        } else {
            let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
            let remFav = favoritesLS.filter((f: any) => {
                return f.id !== game.id;
            });
            localStorage.setItem("favorites", JSON.stringify(remFav));
        }
        dispatch(getFavoritesLocalStorage())
    }



    return (
        <div className={s.wrapper}>
            <div className={s.topCard}>
                <div className={s.wrapper_image}
                    style={{
                        backgroundImage: `url(${game.main_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: '200px'
                    }}>
                    <i className={favorite ? s.favIconCard : s.noFavIconCard} onClick={(e) => handleFavorites(e)}>{favorite ? <MdFavorite /> : <MdFavoriteBorder />}</i>
                </div>
            </div>
            <div className={s.outer}>
                <div className={s.content}>
                    <div>
                        <span className={s.bg}>{tag}</span>
                        <NavLink to={`/detail/${game.id}`} className={s.navlink}><h2>{game.name}</h2></NavLink>
                        <p className={s.cardDescription}>{game.name.length < 20 ? game.description.slice(0, 180) + '...' : game.name.length >= 20 && game.name.length < 40 ? game.description.slice(0, 140) + '...' : game.name.length > 40 && game.description.slice(0, 110) + '...'}</p>
                    </div>

                    <div className={s.button}>
                        <NavLink to={`/detail/${game.id}`}>
                            ${game.price}
                        </NavLink>
                        <a className={s.cart_btn}><i className={`${s.cart_icon} ${s.ion_bag}`}></i>ADD TO CART</a>
                    </div>

                </div>
            </div>
        </div>
    );
}