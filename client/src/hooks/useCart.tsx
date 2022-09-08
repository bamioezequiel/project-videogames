import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, cleanAllGames, getAllGames, getCart, getCartLocalStorage, removeCart } from '../redux/actions';
import useAuth from './useAuth';

export default function useCart() {
  const dispatch: Function = useDispatch();
  const [cart, setCart] = useState(false);
  const { isAuth, user } = useAuth();
  const cartUser = useSelector((state: any) => state.cart);

  /* useEffect( () => {
    // await dispatch(getCart(user.id));
    ( async () => await getCart(user.id) )()
  }, [] ); */

  async function getAllItemsCart() {
    if (isAuth) {
      await dispatch(getCart(user.id));

      return await cartUser.cart;
    } else {
      return JSON.parse(localStorage.getItem("cart") || '[]');
    }
  }

  async function saveAllItemsInCart(userId: any) {
    let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
    if (cartLS.length === 0) { return }
    for (let i = 0; i < cartLS.length; i++) {
      if (cartUser.cart?.find((g: any) => g.id == cartLS[i].id)) { continue }
      else {
        await dispatch(addCart(userId, cartLS[i].id));
      };
    }
    localStorage.removeItem("cart");
    await dispatch(getCartLocalStorage());
  }

  async function setItemCart(id: any, cart?: any) {
    if (isAuth) {
      if(!Object.keys(cartUser).length) {
        // await dispatch(getCart(user.id));
        cart.cart?.find((c: any) => c.id == id && setCart(true));
        console.log(user, cart, id);
      } else {
        cartUser.cart?.find((c: any) => c.id == id && setCart(true));
      }
    } else {
      let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
      cartLS?.find((c: any) => c.id == id && setCart(true));
    }
  }

  function findItemCart(id: any) {
    let res = false;
    let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
    cartLS?.find((c: any) => c.id == id && (res = true));
    return res;
  }

  function handleCart(e: any, game: any) {
    e.preventDefault();
    if (isAuth) {
      if (cartUser.cart?.find((g: any) => g.id == game.id)) {
        dispatch(removeCart(user.id, game.id));
        setCart(false);
      } else {
        dispatch(addCart(user.id, game.id));
        setCart(true);
      }
      dispatch(cleanAllGames());
      dispatch(getCart(user.id));
    } else {
      if (!findItemCart(game.id)) {
        if (!localStorage.getItem("cart")) {
          let cartLS = [];
          cartLS.push(game);
          localStorage.setItem("cart", JSON.stringify(cartLS));
        } else {
          let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
          if (cartLS?.filter((c: any) => c.id !== game.id)) {
            cartLS.unshift(game);
            localStorage.setItem("cart", JSON.stringify(cartLS));
          }
        }
        setCart(true);
      } else {
        let cartLS = JSON.parse(localStorage.getItem("cart") || '[]');
        let remCart = cartLS.filter((c: any) => {
          return c.id !== game.id;
        });
        localStorage.setItem("cart", JSON.stringify(remCart));
        setCart(false);
      }
    }
    dispatch(getCartLocalStorage());
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