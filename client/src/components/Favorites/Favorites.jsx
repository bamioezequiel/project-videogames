import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import FavoriteCard from "../Cards/FavoriteCard/FavoriteCard";
import SearchBar from "../SearchBar/SearchBar";
import s from './Favorites.module.css';

export default function Favorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
    const favoritesDB = useSelector((state) => state.favorites);
    const { isAuth, user } = useAuth();
    return (
        <div className={s.favorites_container}>
            <div className={s.favorites_menu}>
                <h2>Favorites</h2>
            </div>
            <div className={s.favorites}>
                {
                    (isAuth)
                        ? favoritesDB?.length > 0
                            ? favoritesDB?.map((f) => {
                                return <FavoriteCard game={f} size='small' />
                            })
                            : <div>Not items</div>
                        : favorites?.length > 0
                            ? favorites?.map((f) => {
                                return <FavoriteCard game={f} size='small' />
                            })
                            : <div>Not items</div>
                }
            </div>
        </div>
    );
}