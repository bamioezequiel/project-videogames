import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function News({ show }: any) {
    const allGames = useSelector((state: any) => state.allGames);
    const newsGames = allGames.filter( (g: any, i: number) => g.is_news || i % 2 === 0 );
    return (
        show && <div className={s.cards_container}>
            {
               newsGames.length > 0 
               ? newsGames.slice(9, 18).map( (g: any) => <Card image={g.main_image} tag='NEWS' /> )
               : <span>No hay nuevos juegos para mostrar</span> 
            }
            {/* <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' /> */}
        </div>
    )
}