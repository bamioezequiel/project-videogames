import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getAllGames, getLoginMeUser, getLogoutUser, getUser } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "./utils/auth";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Store from "./components/Store/Store";
import Login from "./components/Login/Login";
import Signup from "./components/Singup/Signup";
import Favorites from './components/Favorites/Favorites';
import Profile from "./components/Profile/Profile";
import Axios from "axios";
// import Cart from './components/Cart/Cart';

function App() {
  const dispatch: Function = useDispatch();
  const loading: boolean = useSelector((state: any) => state.loading);
  const tokenUserId: any = JSON.parse(localStorage.getItem('User') || '{}');
  const { isAuth } = useAuth();

  useEffect(() => {
    if (Object.keys(tokenUserId).length) {
      loginMe();
    }
    return () => {
      if (Object.keys(tokenUserId).length) {
        loginMe();
      }
    };
  }, []);

  const loginMe = async () => {
    const res: any = await dispatch(getLoginMeUser());
    if (res && res.id) {
      await dispatch(getUser(res.id));
    }
    localStorage.setItem("User", JSON.stringify(res));
  };

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  return (
    // loading ? <div>Cargando...</div>
    <div className='container'>
      <BrowserRouter>
        <Nav />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuth ? <Signup /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
