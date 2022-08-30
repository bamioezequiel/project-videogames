import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Card from "../Cards/MainCard/Card";
import s from './Cart.module.css';

export default function Cart() {
    const { isAuth } = useAuth();
    const cart = useSelector((state: any) => state.cart)
    const cartLS = useSelector((state: any) => state.cartLS)

    return (
        <div className={s.cart_container}>
            {
                (isAuth)
                    ? cart.cart?.length > 0
                        ? cart.cart?.map((c: any) => {
                            return <Card game={c} size='small' />
                        })
                        : <div>Not items</div>
                    : cartLS?.length > 0
                        ? cartLS?.map((c: any) => {
                            return <Card game={c} size='small' />
                        })
                        : <div>Not items</div>
            }

        </div>
    );
}