import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Reviews({ show }: any) {
    const allGames = useSelector((state: any) => state.allGames);
    const reviewsGames = allGames.filter( (g: any) => g.rating > 4 );
    return (
        show && <div className={s.cards_container}>
            {
                reviewsGames.length > 0 
                ? reviewsGames.slice(0, 9).map( (g: any) => <Card image={g.main_image} tag='REVIEWS' /> )
                : <span>No hay juegos calificados para mostrar</span> 
            }
            {/* <Card image='https://imgur.com/IRINZJc.jpg' tag='REVIEWS' /> */}
        </div>
    )
}