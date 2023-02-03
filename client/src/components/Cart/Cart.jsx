import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Payment } from "../../redux/actions";
import CartCard from "../Cards/CartCard/CartCard";
import Card from "../Cards/MainCard/Card";
import s from "./Cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const cart = useSelector((state) => state.cart);

  let total = 0;
  cart?.cart?.map((g) => {
    total += g.price;
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
      const res = await axios.post("/payment/mp", {
        token,
      });
      console.log(res);
      window.location = res.data.init_point;
  };

  return (
    <div className={s.cart_container}>
      <div className={s.cart_menu}>
        <h2>Shopping Cart</h2>
      </div>
      {cart.cart?.length > 0 ? (
        <div className={s.cart_content}>
          <div className={s.card_group}>
            <h3>{cart.cart?.length} Games in Cart</h3>
            <div>
              {cart.cart?.map((c) => {
                return <CartCard game={c} size="small" tag="" />;
              })}
            </div>
          </div>
          <div className={s.cart_checkout}>
            <h3>Total: </h3>
            <span className={s.cart_price_total}>
              {cart.total?.toFixed(2)} USD
            </span>
            {cart.total?.toFixed(2) != total?.toFixed(2) && (
              <span
                style={{ textDecoration: "line-through" }}
                className={s.cart_price_real}
              >
                {total?.toFixed(2)} USD
              </span>
            )}
            <button onClick={(e) => handlePayment(e)}>Checkout</button>
          </div>
        </div>
      ) : (
        <div>Not items</div>
      )}
    </div>
  );
}
