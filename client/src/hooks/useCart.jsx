import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../components/Loading/Loading";
import {
  addCart,
  cleanAllGames,
  getAllGames,
  getCart,
  getCartLocalStorage,
  removeCart,
} from "../redux/actions";
import useAuth from "./useAuth";

export default function useCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState(false);
  const cartUser = useSelector((state) => state.cart);

  async function setItemCart(id, cart) {
    cart.cart?.find((c) => c._id == id && setCart(true));
  }

  async function handleCart(e, game) {
    e.preventDefault();
    if (cartUser.cart?.find((g) => g._id == game._id)) {
      await dispatch(removeCart(user._id, game._id));
      await setCart(false);
    } else {
      await dispatch(addCart(user._id, game._id));
      await setCart(true);
    }
    await dispatch(cleanAllGames());
    await dispatch(getCart(user._id));
  }

  return {
    cart,
    setCart,
    handleCart,
    setItemCart
  };
}
