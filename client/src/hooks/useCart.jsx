import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, cleanAllGames, getAllGames, getCart, getCartLocalStorage, removeCart } from '../redux/actions';
import useAuth from './useAuth';

export default function useCart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(false);
  const { isAuth, user } = useAuth();
  const cartLS = JSON.parse(localStorage.getItem("cart") || '[]');;
  const cartUser = useSelector((state) => state.cart);
  const arrCart = isAuth ? cartUser : cartLS;

  async function getAllItemsCart() {
    if (isAuth) {
      await dispatch(getCart(user.id));

      return await cartUser.cart;
    } else {
      return JSON.parse(localStorage.getItem("cart") || '[]');
    }
  }

  async function saveAllItemsInCart(userId) {
    let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
    if (cartLS.length === 0) { return }
    for (let i = 0; i < cartLS.length; i++) {
      if (cartUser.cart?.find((g) => g.id == cartLS[i].id)) { continue }
      else {
        await dispatch(addCart(userId, cartLS[i].id));
      };
    }
    localStorage.removeItem("cart");
    await dispatch(getCartLocalStorage());
  }

  async function setItemCart(id, cart) {
    if (isAuth) {
      if (!Object.keys(cartUser).length) {
        // await dispatch(getCart(user.id));
        cart.cart?.find((c) => c.id == id && setCart(true));
        console.log(user, cart, id);
      } else {
        cartUser.cart?.find((c) => c.id == id && setCart(true));
      }
    } else {
      let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
      cartLS?.find((c) => c.id == id && setCart(true));
    }
  }

  function findItemCart(id) {
    let res = false;
    let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
    cartLS?.find((c) => c.id == id && (res = true));
    return res;
  }

  async function handleCart(e, game) {
    e.preventDefault();
    if (isAuth) {
      if (cartUser.cart?.find((g) => g.id == game.id)) {
        await dispatch(removeCart(user.id, game.id));
        setCart(false);
      } else {
        await dispatch(addCart(user.id, game.id));
        setCart(true);
      }
      await dispatch(cleanAllGames());
      await dispatch(getCart(user.id));
    } else {
      if (!findItemCart(game.id)) {
        if (!localStorage.getItem("cart")) {
          let cartLS = [];
          cartLS.push(game);
          localStorage.setItem("cart", JSON.stringify(cartLS));
        } else {
          let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
          if (cartLS?.filter((c) => c.id !== game.id)) {
            cartLS.unshift(game);
            localStorage.setItem("cart", JSON.stringify(cartLS));
          }
        }
        setCart(true);
      } else {
        let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
        let remCart = cartLS.filter((c) => {
          return c.id !== game.id;
        });
        localStorage.setItem("cart", JSON.stringify(remCart));
        setCart(false);
      }
    }
    await dispatch(getCartLocalStorage());
  }

  return {
    cart,
    setCart,
    saveAllItemsInCart,
    getAllItemsCart,
    setItemCart,
    findItemCart,
    handleCart
  }
}