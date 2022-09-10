import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import Card from "../Cards/MainCard/Card";
import s from './Favorites.module.css';

export default function Favorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
    const favoritesDB = useSelector( (state: any) => state.favorites );
    const { isAuth, user } = useAuth();
    return (
        <div className={s.favorites_container}>
            {
                (isAuth)
                ? favoritesDB?.length > 0
                    ? favoritesDB?.map((f: any) => {
                        return <Card game={f} size='small' />
                    })
                    : <div>Not items</div>
                : favorites?.length > 0
                    ? favorites?.map((f: any) => {
                        return <Card game={f} size='small' />
                    })
                    : <div>Not items</div>
            }
            
        </div>
    );
}