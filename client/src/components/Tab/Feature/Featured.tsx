import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredFeaturedGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Features({ show }: any) {
    const dispatch: Function = useDispatch();
    const featuresGames = useSelector((state: any) => state.filterFeaturedGames);

    useEffect( () => {
        dispatch(getFilteredFeaturedGames());
    }, [dispatch]);

    return (
        show && <div className={s.cards_container}>
            {
                featuresGames?.length > 0 
                ? featuresGames.slice(0, 9).map( (g: any) => <Card id={g.id} name={g.name} description={g.description} price={g.price} image={g.main_image} tag='FEATURES' /> )
                : <span>No hay juegos destacados para mostrar</span> 
            }
            
            {/* <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />  */}
        </div>
    )
}