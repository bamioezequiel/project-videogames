import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Reviews({ show }) {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games);
    const reviewsGames = allGames.filter( (g) => g.on_sale > 0 );

    useEffect( () => {
        if(!allGames.length) {
            dispatch(getGames());
        }
    }, [dispatch]);

    return (
        show && <div className={s.cards_container}>
            {
                reviewsGames.length > 0 
                ? reviewsGames.slice(0, 9).map( (g) => <Card key={g.id+g.name} game={g} tag='ON SALE' /> )
                : <span>No games on sale</span> 
            }
        </div>
    )
}