import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
    // const dispatch: Function = useDispatch();
    const user: any = useSelector((state: any) => state.user);
    
    

    return {
        isAuth: Object.keys(user).length > 0,
        user: user
    }
}