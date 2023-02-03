import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../redux/actions";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Card({ game, tag }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, handleCart, setItemCart } = useCart();
  const { isAuth } = useAuth();
  const user = useSelector((state) => state.user);
  const cartUser = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuth) {
      (async () => {
        await setItemCart(game._id, cartUser);
      })();
    }
  }, [dispatch, game._id]);

  const handleClickCart = async (e, game) => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    await handleCart(e, game);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.topCard}>
        <div
          className={s.wrapper_image}
          style={{
            backgroundImage: `url(${game.main_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
          }}
        ></div>
      </div>
      <div className={s.outer}>
        <div className={s.content}>
          <div>
            <span className={s.bg}>{tag}</span>
            <NavLink to={`/detail/${game._id}`} className={s.navlink}>
              <h2>{game.name}</h2>
            </NavLink>
            <p className={s.cardDescription}>
              {game.name.length < 20
                ? game.description.slice(0, 180) + "..."
                : game.name.length >= 20 && game.name.length < 40
                ? game.description.slice(0, 140) + "..."
                : game.name.length > 40 &&
                  game.description.slice(0, 110) + "..."}
            </p>
          </div>

          <div className={s.button}>
            <NavLink to={`/detail/${game._id}`}>${game.on_sale > 0 ? game.price_with_sale : game.price}</NavLink>
            <a className={s.cart_btn} onClick={(e) => handleClickCart(e, game)}>
              <i className={`${s.cart_icon} ${s.ion_bag}`}></i>
              {cart ? <span>REMOVE TO CART</span> : <span>ADD TO CART</span>}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
