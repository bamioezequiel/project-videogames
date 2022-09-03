import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Reviews({ show }: any) {
    const allGames = useSelector((state: any) => state.allGames);
    const reviewsGames = allGames.filter( (g: any) => g.on_sale > 0 );
    return (
        show && <div className={s.cards_container}>
            {
                reviewsGames.length > 0 
                ? reviewsGames.slice(0, 9).map( (g: any) => <Card key={g.id+g.name} game={g} tag='ON SALE' /> )
                : <span>No games on sale</span> 
            }
        </div>
    )
}