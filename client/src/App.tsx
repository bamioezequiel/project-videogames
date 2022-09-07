import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticateStatus, getAllGames, getAllUsers, getCart, getCartLocalStorage, getFavoritesLocalStorage, getGenres, getPlatforms, getTags, getUser } from "./redux/actions";
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
import Dashboard from "./components/Dashboard/Dashboard";
import ListUsers from "./components/Dashboard/ListUsers/ListUsers";
import ListGames from "./components/Dashboard/ListGames/ListGames";
import CreateGame from "./components/Dashboard/CreateGame/CreateGame";
import ListOrders from "./components/Dashboard/ListOrders/ListOrders";
function App() {
  const dispatch: Function = useDispatch();
  const allGames = useSelector((state: any) => state.allGames);
  const tokenUser: any = localStorage.getItem('token');
  const { isAuth, user, isAdmin, loginStatus } = useAuth();
  const { saveAllItemsInCart } = useCart();
  const { loading, setLoading, Loading }: any = useLoading();

  const loadGames = async () => {
    await dispatch(getPlatforms());
    await dispatch(getTags());
    await dispatch(getGenres());
    await dispatch(getAllGames());
    await dispatch(getAllUsers());
  }

  useEffect(() => {
    if (allGames.length > 0) {
      if (tokenUser !== null) {
        if (isAuth) {
          dispatch(getCart(user.id))
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [allGames, isAuth])

  useEffect(() => {
    if (allGames.length === 0) {
      loadGames();
    }
  }, [allGames])

  useEffect(() => {
    if (tokenUser !== null) {
      (async () => {
        let res = await loginStatus();
        await dispatch(getCart(res.payload.id))
        saveAllItemsInCart(res.payload.id);
      })();
    } else {
      dispatch(getFavoritesLocalStorage());
      dispatch(getCartLocalStorage());
    }

    return () => {
      if (tokenUser !== null) {
        loginStatus();
        dispatch(getCart(user.id))
        saveAllItemsInCart(user.id);
      }
    };
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
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <Signup /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />

            <Route path="/dashboard" element={(isAdmin) ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/dashboard/users" element={(isAdmin) ? <ListUsers /> : <Navigate to="/" />} />
            <Route path="/dashboard/users/:id" element={(isAdmin) ? <Profile /> : <Navigate to="/" />} />
            <Route path="/dashboard/orders" element={(isAdmin) ? <ListOrders /> : <Navigate to="/" />} />
            <Route path="/dashboard/games" element={(isAdmin) ? <ListGames /> : <Navigate to="/" />} />
            <Route path="/dashboard/create-game" element={(isAdmin) ? <CreateGame /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
