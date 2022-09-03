import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, createUser, authenticateStatus, getCart } from "../redux/actions";
import useCart from "./useCart";

export default function useAuth() {
    const dispatch: Function = useDispatch();

    const user: any = useSelector((state: any) => state.user);
    const isAuth = Object.keys(user).length > 0;
    const isAdmin = (user.rol === 'Admin' || user.rol === 'Owner');
    const token: any = localStorage.getItem('token');

    const logout = async () => {
        await dispatch(logoutUser());
    }

    const login = async (user: any) => {
        return await dispatch(loginUser(user));
    }

    const register = async (user: any) => {
        return await dispatch(createUser(user));
    }

    const loginStatus = async () => {
        const token = localStorage.getItem("token");
        if(token === null) { return '' }
        const res: any = await dispatch(authenticateStatus(token));
        return res;
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