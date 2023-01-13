import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Payment } from "../../redux/actions";
import CartCard from "../Cards/CartCard/CartCard";
import Card from "../Cards/MainCard/Card";
import s from './Cart.module.css';

export default function Cart() {
  const dispatch = useDispatch();
    const { isAuth } = useAuth();
    const cart = useSelector((state) => state.cart)
    const cartLS = useSelector((state) => state.cartLS)
    let total = 0;
    cart?.cart?.map((g) => { total += g.price });
    let arrCart = {
        cart: [],
        total: 0,
        price: 0,
    };
    if (isAuth) {
        arrCart.cart = cart.cart;
        arrCart.price = cart.price;
        let total = 0;
        cart?.cart?.map((g) => { total += g.price });
        arrCart.total = total;
    } else {
        arrCart.cart = cartLS;
        let total = 0;
        cartLS?.map((g) => { total += g.price });
        arrCart.total = total;
        let totalWithSale = 0;
        cartLS?.map((g) => { totalWithSale += g.price_with_sale });
        arrCart.price = totalWithSale;
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        await dispatch(Payment(cart));
    }
    return (
       <div className={s.cart_container}>
            <div className={s.cart_menu}>
            <h2>Shopping Cart</h2>
            </div>
            {
                arrCart.cart?.length > 0 ? <div className={s.cart_content}>
                    <div className={s.card_group}>
                        <h3>{arrCart.cart?.length} Games in Cart</h3>
                        <div>
                            {

                                arrCart.cart?.map((c) => {
                                    return <CartCard game={c} size='small' tag='' />
                                })

                            }
                        </div>
                    </div>
                    <div className={s.cart_checkout}>
                        <h3>Total: </h3>
                        <span className={s.cart_price_total}>{arrCart.price?.toFixed(2)} USD</span>
                        {
                            (arrCart.price?.toFixed(2) != arrCart.total?.toFixed(2)) && <span style={{ textDecoration: 'line-through' }} className={s.cart_price_real}>
                                {arrCart?.total?.toFixed(2)} USD
                            </span>
                        }
                        <button onClick={ (e) => handlePayment(e)}>Checkout</button>
                    </div>
                </div> : <div>Not items</div>
            }

        </div>
    );
}