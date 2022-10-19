import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, cleanAllGames, getFavorites, getFavoritesLocalStorage, getUser, removeFavorites } from '../redux/actions';
import useAuth from './useAuth';

export default function useFavorites() {
    const dispatch: Function = useDispatch();
    const favoritesDB = useSelector( (state: any) => state.favorites );
    const [favorites, setFavorites] = useState(false);
    const { isAuth, user } = useAuth();

    async function saveAllItemsInFavorites(userId: any) {
        let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
        if (favoritesLS.length === 0) { return }
        for (let i = 0; i < favoritesLS.length; i++) {
            if (favoritesDB?.find((g: any) => g.id == favoritesLS[i].id)) { continue }
            else {
                await dispatch(addFavorites(userId, favoritesLS[i].id));
            };
        }
        dispatch(getFavorites(userId))
        localStorage.removeItem("favorites");
        await dispatch(getFavoritesLocalStorage());
    }


    async function setItemFavorites(id: any) {
        if (isAuth) {
            favoritesDB?.find((c: any) => c.id == id && setFavorites(true));
        } else {
            let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
            favoritesLS?.find((c: any) => c.id == id && setFavorites(true));
        }
    }

    function findItemFavorites(id: any) {
        let res = false;
        let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
        favoritesLS?.find((c: any) => c.id == id && (res = true));
        return res;
    }

    async function handleFavorites(e: any, game: any) {
        e.preventDefault();

        if (isAuth) {
            if (favoritesDB?.find((g: any) => g.id == game.id)) {
                await dispatch(removeFavorites(user.id, game.id));
                setFavorites(false);
            } else {
                await dispatch(addFavorites(user.id, game.id));
                setFavorites(true);
            }
            await dispatch(cleanAllGames());
            await dispatch(getFavorites(user.id));
        } else {
            if (!findItemFavorites(game.id)) {
                if (!localStorage.getItem("favorites")) {
                    let favoritesLS = [];
                    favoritesLS.push(game);
                    localStorage.setItem("favorites", JSON.stringify(favoritesLS));
                } else {
                    let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
                    if (favoritesLS?.filter((c: any) => c.id !== game.id)) {
                        favoritesLS.unshift(game);
                        localStorage.setItem("favorites", JSON.stringify(favoritesLS));
                    }
                }
                setFavorites(true);
            } else {
                let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
                let remFavorites = favoritesLS.filter((c: any) => {
                    return c.id !== game.id;
                });
                localStorage.setItem("favorites", JSON.stringify(remFavorites));
                setFavorites(false);
            }
        }

        await dispatch(getFavoritesLocalStorage())
    }


    return {
        favorites,
        setFavorites,
        saveAllItemsInFavorites,
        setItemFavorites,
        findItemFavorites,
        handleFavorites
    }
}