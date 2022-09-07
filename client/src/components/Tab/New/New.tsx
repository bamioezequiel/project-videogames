import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function New({ show }: any) {
    const dispatch: Function = useDispatch();
    const allGames = useSelector((state: any) => state.allGames);
    const newGames = allGames.filter((g: any) => g.is_new == true);;

    useEffect( () => {
        if(!allGames.length) {
            dispatch(getAllGames());
        }
    }, [dispatch]);
    
    console.log(newGames)
    return (
        show && <div className={s.cards_container}>
            {
               newGames?.length > 0 
               ? newGames.map( (g: any) => <Card key={g.id+g.name} game={g} tag='NEW' /> )
               : <span>No new games</span> 
            }
        </div>
    )
}