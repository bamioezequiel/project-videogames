import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredFeaturedGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Featured({ show }: any) {
    const dispatch: Function = useDispatch();
    // const featuredGames = useSelector((state: any) => state.filterFeaturedGames);
    const featuredGames = useSelector((state: any) => state.allGames);

    useEffect( () => {
        // dispatch(getFilteredFeaturedGames());
    }, [dispatch]);

    return (
        show && <div className={s.cards_container}>
            {
                featuredGames?.length > 0 
                ? featuredGames.slice(0, 9).map( (g: any) => <Card key={g.id+g.name} game={g} tag='FEATURED' /> )
                : <span>No hay juegos destacados para mostrar</span> 
            }
            
            {/* <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />  */}
        </div>
    )
}