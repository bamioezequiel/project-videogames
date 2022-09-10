import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { getCart, getFavorites, getFavoritesLocalStorage } from "../../../redux/actions";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useFavorites from "../../../hooks/useFavorites";

export default function Card({ game, tag }: any) {
    const dispatch: Function = useDispatch();
    // const [favorite, setFavorite] = useState(false);
    const { cart, handleCart, setItemCart } = useCart();
    const { favorites, handleFavorites, setItemFavorites } = useFavorites();
    const { isAuth } = useAuth();
    const user = useSelector( (state: any) => state.user )
    const cartUser = useSelector( (state: any) => state.cart )

    useEffect(() => {
        ( async () => {
            await setItemFavorites(game.id)
        })()
        
        // let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
        // favoritesLS?.find((f: any) => f.id == game.id && setFavorite(true));
        // ( async () => await setItemCart(game.id))()
        if(isAuth && !Object.keys(cartUser).length) {
            ( async () => {
                let res = await dispatch(getCart(user.id));
                await setItemCart(game.id, res.payload);
            } )()
        } else {
            ( async () => await setItemCart(game.id))()
        }
    }, [dispatch, game.id]);




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
                    <i className={favorites ? s.favIconCard : s.noFavIconCard} onClick={(e) => handleFavorites(e, game)}>{favorites ? <MdFavorite /> : <MdFavoriteBorder />}</i>
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
                        <a className={s.cart_btn} onClick={(e: any) => handleCart(e, game)}>
                            <i className={`${s.cart_icon} ${s.ion_bag}`}></i>
                            {
                                (cart)
                                    ? <span>REMOVE TO CART</span>
                                    : <span>ADD TO CART</span>
                            }
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}