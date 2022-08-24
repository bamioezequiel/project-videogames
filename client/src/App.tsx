import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Store from "./components/Store/Store";
import Login from "./components/Login/Login";
import Signup from "./components/Singup/Signup";
import Favorites from './components/Favorites/Favorites';
import { useEffect } from "react";
import { getAllGames } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import Cart from './components/Cart/Cart';

function App() {
  const dispatch: Function = useDispatch();
  const loading: boolean = useSelector( (state: any) => state.loading );
  
  useEffect(() => {
    dispatch(getAllGames())
  }, [dispatch]);

  return (
    loading ? <div>Cargando...</div>
    : <div className='container'>
      <BrowserRouter>
        <Nav />
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
