import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, createUser, authenticateStatus, getCart } from "../redux/actions";
import useCart from "./useCart";

export default function useAuth() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    let isAuth = Object.keys(user).length > 1;
    const isAdmin = (user.rol === 'Admin' || user.rol === 'Owner');
    const token = localStorage.getItem('token');

    const logout = () => {
        if(!user.status) localStorage.removeItem('token');
        dispatch(logoutUser());
    }

    const login = async (user) => {
        return await dispatch(loginUser(user));
    }

    const register = async (user) => {
        return await dispatch(createUser(user));
    }

    const loginStatus = async () => {
        const token = localStorage.getItem("token");
        if(token === null) { return false }
        const res = await dispatch(authenticateStatus(token));
        return res.payload.status;
    }

    return {
        user,
        isAuth,
        isAdmin,
        token,
        loginStatus,
        register,
        login,
        logout,
    }
}