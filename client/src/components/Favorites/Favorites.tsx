import React from "react";
import Card from "../Cards/MainCard/Card";
import s from './Favorites.module.css';

export default function Favorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');

    return (
        <div className={s.favorites_container}>
            {
                favorites.length > 0 && favorites?.map( (f: any) => {
                    return <Card game={f} tag='NEWS' size='small' />
                })
            }
            
        </div>
    );
}