import React from 'react';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function News({ show }: any) {
    return (
        show && <div className={s.cards_container}>
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='NEWS' />
        </div>
    )
}