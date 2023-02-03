import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticateStatus, getAllGames, getAllUsers, getCart, getCartLocalStorage, getFavorites, getFavoritesLocalStorage, getGames, getGenres, getPlatforms, getTags, getUser, getUserByToken } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "./hooks/useAuth";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Store from "./components/Store/Store";
import Login from "./components/Login/Login";
import Signup from "./components/Singup/Signup";
import Profile from "./components/Profile/Profile";
import useLoading from "./components/Loading/Loading";
import useCart from "./hooks/useCart";
import Cart from './components/Cart/Cart';
import Dashboard from "./components/Dashboard/Dashboard";
import ListUsers from "./components/Dashboard/ListUsers/ListUsers";
import ListGames from "./components/Dashboard/ListGames/ListGames";
import CreateGame from "./components/Dashboard/CreateGame/CreateGame";
import ListOrders from "./components/Dashboard/ListOrders/ListOrders";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://videogames-ezequiel-bamio.onrender.com/";

function App() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const tokenUser = localStorage.getItem('token');
  const { isAuth, user, isAdmin, loginStatus, logout } = useAuth();
  const { saveAllItemsInCart, getAllItemsCart } = useCart();
  const { loading, setLoading, Loading } = useLoading();

  const loadGames = () => {
    dispatch(getPlatforms());
    dispatch(getTags());
    dispatch(getGenres());
    dispatch(getAllGames());
    dispatch(getGames());
  }

  const loginUserStatus = async () => {
    console.log(await loginStatus());
    if(await loginStatus()) {
      const token = localStorage.getItem('token');
      console.log(localStorage.getItem('token'));
      const response = await dispatch(getUserByToken(token));
      dispatch(getCart(response.payload._id))
    } else {
      logout();
    }
  }

  useEffect(()=> {
    setLoading(true);
    loadGames();
    loginUserStatus();
  }, [])
  
  useEffect(()=> {
    if(games.length) {
      setLoading(false);
    }
  }, [games])

  return (
    loading ? <Loading /> : <div className='container-app'>
      <BrowserRouter>
        <Nav />
        <div className="content-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/detail/:id" element={<Detail />} />
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
            <Route path="/dashboard/update-game/:id" element={(isAdmin) ? <CreateGame /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
