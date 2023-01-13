import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function New({ show }) {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games);
    const newGames = allGames.filter((g) => g.is_new == true);;

    useEffect( () => {
        if(!allGames.length) {
            dispatch(getGames());
        }
    }, [dispatch]);
    
    return (
        show && <div className={s.cards_container}>
            {
               newGames?.length > 0 
               ? newGames.map( (g) => <Card key={g.id+g.name} game={g} tag='NEW' /> )
               : <span>No new games</span> 
            }
        </div>
    )
}