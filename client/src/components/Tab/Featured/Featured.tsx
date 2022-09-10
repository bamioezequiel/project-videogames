import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Featured({ show }: any) {
    const dispatch: Function = useDispatch();
    const allGames = useSelector((state: any) => state.games);
    const featuredGames = allGames.filter((g: any) => g.featured == true);

    useEffect(() => {
        if (!allGames.length) {
            dispatch(getGames());
        }
    }, [dispatch]);

    return (
        show && <div className={s.cards_container}>
            {
                featuredGames?.length > 0
                    ? featuredGames.slice(0, 9).map((g: any) => <Card key={g.id + g.name} game={g} tag='FEATURED' />)
                    : <span>No featured games</span>
            }
        </div>
    )
}