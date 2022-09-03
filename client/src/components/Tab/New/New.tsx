import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredNewGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function New({ show }: any) {
    const dispatch: Function = useDispatch();
    const newGames = useSelector((state: any) => state.filteredNewGames);
    // const newGames = useSelector((state: any) => state.allGames);

    useEffect( () => {
        dispatch(getFilteredNewGames());
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