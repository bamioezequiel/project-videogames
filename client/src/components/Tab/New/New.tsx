import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredNewGames } from '../../../redux/actions';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function News({ show }: any) {
    const dispatch: Function = useDispatch();
    const newGames = useSelector((state: any) => state.filterNewGames);

    useEffect( () => {
        dispatch(getFilteredNewGames());
    }, [dispatch]);

    return (
        show && <div className={s.cards_container}>
            {
               newGames?.length > 0 
               ? newGames.slice(9, 18).map( (g: any) => <Card id={g.id} name={g.name} description={g.description} price={g.price} image={g.main_image} tag='NEWS' /> )
               : <span>No hay nuevos juegos para mostrar</span> 
            }
        </div>
    )
}