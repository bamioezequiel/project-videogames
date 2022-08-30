import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllGames, getCart, getCartLocalStorage, getFavoritesLocalStorage, getGenres, getLoginMeUser, getPlatforms, getTags, getUser } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "./hooks/useAuth";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Store from "./components/Store/Store";
import Login from "./components/Login/Login";
import Signup from "./components/Singup/Signup";
import Favorites from './components/Favorites/Favorites';
import Profile from "./components/Profile/Profile";
import useLoading from "./components/Loading/Loading";
import useCart from "./hooks/useCart";
import Cart from './components/Cart/Cart';

function App() {
  const dispatch: Function = useDispatch();
  const allGames = useSelector((state: any) => state.allGames);
  const tokenUser: any = JSON.parse(localStorage.getItem('User') || '{}');
  const { isAuth, user } = useAuth();
  const { saveAllItemsInCart } = useCart();
  const { loading, setLoading, Loading }: any = useLoading();

  const loginMe = async () => {
    const res: any = await dispatch(getLoginMeUser());
    if (res && res.id) {
      await dispatch(getUser(res.id));
      await dispatch(getCart(res.id));
      saveAllItemsInCart(res.id);
      localStorage.setItem("User", JSON.stringify(res));
    } else {
      localStorage.removeItem("User");
    }
  };

  const loadGames = async () => {
    await dispatch(getPlatforms());
    await dispatch(getTags());
    await dispatch(getGenres());
    await dispatch(getAllGames());
  }

  useEffect(() => {
    if (allGames.length === 0) {
      loadGames();
      setLoading(false);
    }
  }, [allGames])
  
  useEffect(() => {
    if (Object.keys(tokenUser).length) {
      if (isAuth) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(false);
    }
  }, [isAuth])

  useEffect(() => {
    if (Object.keys(tokenUser).length) {
      loginMe();
    }
    return () => {
      if (Object.keys(tokenUser).length) {
        loginMe();
      }
    };
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCart(user.id));
    } else {
      dispatch(getFavoritesLocalStorage());
      dispatch(getCartLocalStorage());
    }
  }, []);

  return (
    loading ? Loading() : <div className='container-app'>
      <BrowserRouter>
        <Nav />
        <div className="content-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <Signup /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
