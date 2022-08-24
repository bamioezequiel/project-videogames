import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Features({ show }: any) {
    const allGames = useSelector((state: any) => state.allGames);
    const featuresGames = allGames.filter( (g: any) => g.features );
    return (
        show && <div className={s.cards_container}>
            {
                featuresGames.length > 0 
                ? featuresGames.slice(0, 9).map( (g: any) => <Card image={g.main_image} tag='FEATURE' /> )
                : <span>No hay juegos destacados para mostrar</span> 
            }
            
            {/* <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />  */}
        </div>
    )
}