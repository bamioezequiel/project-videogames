import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
    const user: any = useSelector((state: any) => state.user);
    return {
        isAuth: Object.keys(user).length > 0,
        user: user
    }
}