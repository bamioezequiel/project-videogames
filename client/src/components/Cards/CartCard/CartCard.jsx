import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import s from "./CartCard.module.css";

export default function CartCard({ game, size, tag }) {
  const navigate = useNavigate();
  const { handleCart } = useCart();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/detail/${game._id}`)
  }

  return (
    <div className={s.card_container}>
      <img src={game.main_image} onClick={( (e) => handleClick(e) )} className={s.card_img} alt={game.name} />
      <h2 onClick={( (e) => handleClick(e) )} className={s.card_title} >{game.name}</h2>
      <div className={s.card_content}>
        <button onClick={(e) => { handleCart(e, game) }} className={s.card_btn} >Remove</button>
        <div className={s.card_price_container}>
          {
            (game.on_sale > 0) ? <span className={s.card_price_onsale}>{game.price_with_sale} USD</span> : <span className={s.card_price}>{game.price} USD</span>
          }
          {
            (game.on_sale > 0) && <span className={s.card_price_with_onsale} >{game.price} USD</span>
          }
        </div>
      </div>
    </div>
  );
}
